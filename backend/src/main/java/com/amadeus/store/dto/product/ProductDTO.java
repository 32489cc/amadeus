package com.amadeus.store.dto.product;

import lombok.Data;

@Data
public class ProductDTO {

    private String category;
    private String series;
    private String scale;
    private String status;
    private Integer priceMin;
    private Integer priceMax;
    private String sort;
    private Integer page;
    private Integer  size;
    private String  q;

}
