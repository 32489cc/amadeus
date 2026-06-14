package com.amadeus.store.entity;

import lombok.Data;

@Data
public class Category {


    private String id;
    private String name;
    private String slug;
    private String parentId;
    private Integer productCount;
    private String tone;
    private Integer sortOrder;
}
