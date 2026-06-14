package com.amadeus.store.dto.category;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

/**
 * 分类的「对外响应」对象，也是返回给前端的树节点。
 *
 * <p>和实体 {@link com.amadeus.store.entity.Category} 的区别：
 * 实体贴着「数据库的形状」（扁平、含 parentId 等内部字段）；本 DTO 贴着「前端要的形状」
 * （嵌套树，不暴露 parentId）。entity → DTO 的转换与建树在
 * {@link com.amadeus.store.service.impl.CategoryServiceImpl#getcategorylist()} 完成。
 *
 * <p>{@code @Data}（Lombok）自动生成 getter/setter/toString 等，Service 才能 setXxx、
 * Jackson 才能序列化成 JSON。
 */
@Data
public class CategoryResponseDTO {

    private String id;            // 分类 id
    private String name;          // 分类名（展示用）
    private String slug;          // URL 友好的英文标识
    private Integer product_count ; // 该分类下的商品数（来源 entity.productCount）
    private String tone;          // 主题色调标记（前端样式用）

    /**
     * 子分类列表。声明时就初始化为空 ArrayList，<b>不能是 null</b>——
     * 这样建树时父节点可以直接 {@code getChildren().add(子节点)} 而不会 NPE；
     * 叶子节点则保持空 {@code []}，保证前端每个节点都有 children 字段、遍历时不用判空。
     */
    private List<CategoryResponseDTO> children = new ArrayList<>();

}
