package com.amadeus.store.service;

import org.springframework.http.ResponseEntity;

import com.amadeus.store.dto.category.CategoryRequestDTO;

public interface CategoryService {

    ResponseEntity<?> getcategorylist();

    ResponseEntity<?>  updatecategory(CategoryRequestDTO categoryRequestDTO);

}
