package com.amadeus.store.mapper;

import java.util.List;

import com.amadeus.store.dto.product.ProductDTO;
import com.amadeus.store.entity.Product;

public interface ProductMapper {

    
    /** 查商品列表（SQL 在 resources/mapper/ProductMapper.xml）。最小可用：SELECT * FROM product */
    List<Product> selectList(ProductDTO productDTO );
}
