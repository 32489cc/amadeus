package com.amadeus.store.service;


import org.springframework.http.ResponseEntity;


import com.amadeus.store.dto.auth.LoginFormDTO;
import com.amadeus.store.dto.auth.SmsLoginFormDTO;

public interface IUserService {


    ResponseEntity<?> sendcode(String phone);


    ResponseEntity<?> login(SmsLoginFormDTO smsloginformdto);
    ResponseEntity<?> login(LoginFormDTO loginformdto);
}
