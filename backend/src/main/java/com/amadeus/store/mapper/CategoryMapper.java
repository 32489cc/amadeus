package com.amadeus.store.mapper;

import java.util.List;

import com.amadeus.store.dto.category.CategoryRequestDTO;
import com.amadeus.store.entity.Category;

public interface CategoryMapper {

    /**
     * 查全部分类（扁平列表，按 sort_order 排序）。
     *
     * <p>为什么返回 {@code List<Category>}（entity）而不是 {@code CategoryResponseDTO}（DTO）：
     *
     * <ol>
     *   <li><b>数据库是扁平的，DTO 是树形的。</b> {@code category} 表里每行就是一个分类，
     *       靠 {@code parent_id} 字段互相关联；一条 {@code SELECT * FROM category} 只能查出
     *       一个扁平列表，天然查不出嵌套结构。而 {@code CategoryResponseDTO} 带 {@code children}
     *       是「父 → 子」的树，是组装出来的视图，不是表的原始形态。</li>
     *
     *   <li><b>建树是业务逻辑，属于 Service，不属于 Mapper。</b> 把扁平 list 按 {@code parentId}
     *       拼成树，是在 {@code CategoryServiceImpl} 里用一个 Map 做的（分层清晰：
     *       Mapper 只管取原始数据，Service 负责组装 + 转 DTO）。</li>
     *
     *   <li><b>entity 保留了建树需要的内部字段。</b> {@code Category} 有 {@code parentId}，
     *       Service 正是靠它判断父子关系；而 DTO 作为对外契约通常不暴露 {@code parentId}，
     *       若 Mapper 直接返回 DTO 反而丢了建树用的字段。</li>
     *
     *   <li><b>避免 MyBatis 嵌套映射的复杂与坑。</b> 想让 Mapper 直接吐出 DTO 树，得写
     *       {@code <resultMap>} + {@code <collection>} 的自关联/递归映射，配置复杂、容易 N+1、
     *       且层级写死。一次扁平查询 + 内存建树更简单、层数不限。</li>
     * </ol>
     */
    List<Category> getcategorylist();

    int updatecategory(CategoryRequestDTO categoryRequestDTO);


}
