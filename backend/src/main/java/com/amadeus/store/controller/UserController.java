package com.amadeus.store.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amadeus.store.dto.auth.LoginFormDTO;
import com.amadeus.store.dto.auth.SmsLoginFormDTO;
import com.amadeus.store.dto.auth.SmsSendRequest;
import com.amadeus.store.service.IUserService;

import jakarta.annotation.Resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/auth")
public class UserController {

@Resource
private IUserService userService;


    /**
     * 
     * 发送验证码
     * @return
     */
    @PostMapping("/sms/send")
    public ResponseEntity<?> sendSmsCode(@RequestBody SmsSendRequest req) {
        return userService.sendcode(req.phone());
    }

    /**
     * 登录
     * 
     */
    @PostMapping("/sms/login")
    public ResponseEntity<?> login(@RequestBody SmsLoginFormDTO smsloginformdto) {
        //TODO: process POST request
        
        return userService.login(smsloginformdto);
    }
    

    
}
