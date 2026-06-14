package com.amadeus.store.mapper;


import com.amadeus.store.entity.AppUser;

public interface UserMapper {

    AppUser findByPhone(String phone);

    
}
