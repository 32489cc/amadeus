package com.amadeus.store.Interceptor;

import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.amadeus.store.dvo.UserDVO;
import com.amadeus.store.utils.RedisConstant;
import com.amadeus.store.utils.UserHolder;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // 1. 从请求头取 token（前端发的是 Authorization: Bearer <token>）
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(401);
            return false;
        }
        String token = authHeader.substring(7);

        // 2. 查 Redis hash：login:token:{token}
        String tokenKey = RedisConstant.LOGIN_TOKEN_KEY + token;
        Map<Object, Object> userMap = stringRedisTemplate.opsForHash().entries(tokenKey);
        if (userMap.isEmpty()) {            // 不存在/已过期
            response.setStatus(401);
            return false;
        }

        // 3. 还原成 UserDVO，存入 ThreadLocal（供业务层 UserHolder.getUser() 取）
        UserDVO userDVO = new UserDVO();
        userDVO.setId((String) userMap.get("id"));
        userDVO.setName((String) userMap.get("name"));
        UserHolder.saveUser(userDVO);

        // 4. 每次访问刷新有效期，活跃用户不掉线
        stringRedisTemplate.expire(tokenKey, RedisConstant.LOGIN_TOKEN_TTL, TimeUnit.MINUTES);

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        // 请求结束清理 ThreadLocal，防止内存泄漏 / 线程复用串数据
        UserHolder.removeUser();
    }

}
