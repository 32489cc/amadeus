package com.amadeus.store.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amadeus.store.dto.category.CategoryRequestDTO;
import com.amadeus.store.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    
    @GetMapping()
    public ResponseEntity<?> getMethodName() {
        return  categoryService.getcategorylist();
    }
    
    @PostMapping("/categories/update")
    public ResponseEntity<?> postMethodName(@RequestBody CategoryRequestDTO  categoryRequestDTO) {
        //TODO: process POST request
        
        return categoryService.updatecategory(categoryRequestDTO);
    }
    

}
