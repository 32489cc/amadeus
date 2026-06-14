package com.amadeus.store.service.impl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import com.amadeus.store.dto.category.CategoryRequestDTO;
import com.amadeus.store.dto.category.CategoryResponseDTO;
import com.amadeus.store.entity.Category;
import com.amadeus.store.exception.ErrorCode;
import com.amadeus.store.mapper.CategoryMapper;
import com.amadeus.store.service.CategoryService;
import com.amadeus.store.utils.ApiResults;
import com.amadeus.store.utils.RedisConstant;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private ObjectMapper objectMapper;


    /**
     * 查询全部分类并组装成树返回。
     *
     * <p>思路：数据库里 category 表是「扁平」的，每行靠 parentId 关联父级；
     * 这里一次性查出扁平列表，再在内存里用两趟遍历拼成「父 → children」的树：
     * <ol>
     *   <li>第一趟：每个 entity 转成 DTO，放进 id -> DTO 的索引 byId（方便 O(1) 按 id 找节点）；</li>
     *   <li>第二趟：按每个节点的 parentId，把它挂到父节点的 children 下；没有父亲的就是顶层。</li>
     * </ol>
     * 最终只返回顶层列表 roots——因为 children 是对象引用，挂好后整棵树都连在 roots 上。
     */
    @Override
    public ResponseEntity<?> getcategorylist() {

        // 0) 先查 Redis 缓存：命中就把 JSON 反序列化成树直接返回（省掉查库 + 建树两步）
        String cached = stringRedisTemplate.opsForValue().get(RedisConstant.CACHE_CATEGORY_TREE_KEY);
        if (cached != null) {
            try {
                List<CategoryResponseDTO> tree =
                        objectMapper.readValue(cached, new TypeReference<List<CategoryResponseDTO>>() {});
                return ApiResults.success(tree);
            } catch (JsonProcessingException e) {
                // 缓存内容损坏 → 忽略，继续走查库
                log.warn("分类缓存反序列化失败，回退查库", e);
            }
        }

        // 从 DB 查出扁平的分类列表（已按 sort_order 排序）
        List<Category> all = categoryMapper.getcategorylist();
    
log.debug("no redis");
        // 1) 第一趟：entity -> DTO，建立 id -> DTO 的索引，供第二趟按 id 查找
        //    注意：这里只 set 了基本字段，没碰 children；DTO 的 children 在声明时已初始化为空 ArrayList，
        //    所以每个节点天生带一个空 []，第二趟才能直接 .add() 而不会 NPE。
        //    用 LinkedHashMap 只是让 byId 的遍历顺序跟插入一致（便于看日志）；
        //    最终 roots/children 的顺序由下面遍历 all 决定，跟这里用 HashMap 还是 LinkedHashMap 无关。
         Map<String, CategoryResponseDTO> byId = new LinkedHashMap<>();
         for (Category c : all) {
             CategoryResponseDTO categorydto = new CategoryResponseDTO();
             categorydto.setId(c.getId());
             categorydto.setName(c.getName());
             categorydto.setSlug(c.getSlug());
             categorydto.setProduct_count(c.getProductCount());
             categorydto.setTone(c.getTone());
             byId.put(c.getId(), categorydto);
         }
         

         // 2) 第二趟：按 parentId 把每个节点挂到父节点下；无父（或父不存在）的归为顶层
         List<CategoryResponseDTO> roots = new ArrayList<>();
         for (Category c : all) {
             CategoryResponseDTO dto = byId.get(c.getId());   // 当前分类对应的 DTO
             String pid = c.getParentId();                    // 当前分类的父 id
             if (pid == null || pid.isEmpty() || !byId.containsKey(pid)) {
                 // 没有父亲（顶层），或父 id 在数据里找不到（脏数据兜底）→ 当作顶层
                 roots.add(dto);
             } else {
                 // 有父亲：把「当前节点 dto」加进「父节点的 children」里（子 → 父.children）
                 byId.get(pid).getChildren().add(dto);
                 //.add(dto);把子节点add进children的list里
             }
         }
        
         // 3) 回写缓存：把建好的树序列化成 JSON 字符串存入 Redis，带 TTL（失败不影响本次返回）
         try {
             stringRedisTemplate.opsForValue().set(
                     RedisConstant.CACHE_CATEGORY_TREE_KEY,
                     objectMapper.writeValueAsString(roots),
                     RedisConstant.CACHE_CATEGORY_TTL, TimeUnit.MINUTES);
         } catch (JsonProcessingException e) {
             log.warn("分类缓存写入失败（不影响本次返回）", e);
         }

         return ApiResults.success(roots);
    }


    @Override
    @Transactional
    public ResponseEntity<?> updatecategory(CategoryRequestDTO categoryRequestDTO) {

        String id=categoryRequestDTO.getId();
        if(id==null || id.isBlank()){
            return ApiResults.fail(ErrorCode.VALIDATION_ERROR, "id 不能为空");
        }
        int result=categoryMapper.updatecategory(categoryRequestDTO);
        if (result <= 0) {
            return ApiResults.fail(ErrorCode.NOT_FOUND, "分类不存在");
        }
        // 事务【提交后】再删缓存：避免“事务未提交时并发读把旧数据重新写回缓存、脏到 TTL 到期”；
        // 删失败也只记日志，不影响已成功的更新（靠 TTL 兜底）
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                try {
                    stringRedisTemplate.delete(RedisConstant.CACHE_CATEGORY_TREE_KEY);
                } catch (Exception e) {
                    log.warn("提交后清分类缓存失败，将由 TTL 兜底", e);
                }
            }
        });
        return ApiResults.success();
    }

    
}
