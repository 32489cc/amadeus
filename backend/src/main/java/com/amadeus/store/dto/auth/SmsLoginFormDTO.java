package com.amadeus.store.dto.auth;

import lombok.Data;

@Data
public class SmsLoginFormDTO {

    private String phone;
    private String code;
    private Boolean rememberMe;
}
