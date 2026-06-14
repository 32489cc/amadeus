package com.amadeus.store.entity;

import java.time.LocalDateTime;

import lombok.Data;

/**
 * 商品实体 —— 映射 product 表（最小可用：只含 product 表字段，不含 series 名/tags）。
 * 下划线列名靠全局 map-underscore-to-camel-case 自动转驼峰。
 */
@Data
public class Product {

    private String id;
    private String seriesId;
    private String categoryId;
    private String name;
    private String scale;
    private Integer price;
    private Integer salePrice;
    private String status;
    private Boolean freeShipping;
    private Integer pointRate;
    private String tone;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
