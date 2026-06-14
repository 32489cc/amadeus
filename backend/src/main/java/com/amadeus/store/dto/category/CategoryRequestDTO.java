package com.amadeus.store.dto.category;

import lombok.Data;

@Data
public class CategoryRequestDTO {

    private String id;
    private String name;          // 分类名（展示用）
    private String slug;          // URL 友好的英文标识
    private Integer productCount ; // 该分类下的商品数（来源 entity.productCount）
    private String tone;          // 主题色调标记（前端样式用）
    private Integer sortOrder;

}
