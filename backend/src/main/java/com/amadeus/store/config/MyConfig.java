package com.amadeus.store.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.amadeus.store.Interceptor.LoginInterceptor;

@Configuration
public class MyConfig implements WebMvcConfigurer{

    // 注入 LoginInterceptor 这个 bean（不再 new），它内部的 @Autowired Redis 才能生效
    @Autowired
    private LoginInterceptor loginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor).excludePathPatterns(
            "/auth/sms/send", "/auth/sms/login",
            "/products/**",   // 商品浏览对游客公开，放行
             "/categories/**",   // 商品浏览对游客公开，放行
             "/error"
        );
    }



}
