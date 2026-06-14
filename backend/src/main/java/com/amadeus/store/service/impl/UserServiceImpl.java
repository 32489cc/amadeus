package com.amadeus.store.service.impl;

import com.amadeus.store.dto.auth.LoginFormDTO;
import com.amadeus.store.dto.auth.SmsLoginFormDTO;
import com.amadeus.store.dvo.UserDVO;
import com.amadeus.store.entity.AppUser;
import com.amadeus.store.exception.ErrorCode;
import com.amadeus.store.mapper.UserMapper;
import com.amadeus.store.service.IUserService;
import com.amadeus.store.utils.ApiResults;
import com.amadeus.store.utils.RedisConstant;
import com.amadeus.store.utils.RegeUtils;

import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public ResponseEntity<?> sendcode(String phone) {
        // 手机号格式校验 —— 不合法时直接返回错误 JSON（400），不抛异常
        if (!RegeUtils.isPhonevaild(phone)) {
            return ApiResults.fail(ErrorCode.VALIDATION_ERROR, "電話番号の形式が正しくありません");
        }
        // 生成 6 位验证码（%06d 补前导 0，当字符串处理）
        String code = String.format("%06d", ThreadLocalRandom.current().nextInt(1_000_000));

        // 暂存到 Redis：login:code:{phone}，TTL 2 分钟
        stringRedisTemplate.opsForValue().set(RedisConstant.LOGIN_CODE_KEY + phone, code, RedisConstant.LOGIN_CODE_TTL, TimeUnit.MINUTES);

        log.debug(code);
        // TODO: 调用短信网关发送 code
        return ApiResults.success();
    }

    @Override
    public ResponseEntity<?> login(SmsLoginFormDTO smsLoginFormDTO) {
        // 手机号格式校验 —— 不合法时直接返回错误 JSON（400），不抛异常
        String phone = smsLoginFormDTO.getPhone();
        String code = smsLoginFormDTO.getCode();
        if (!RegeUtils.isPhonevaild(phone)) {
            return ApiResults.fail(ErrorCode.VALIDATION_ERROR, "電話番号の形式が正しくありません");
        }
        // 验证手机验证码（从 Redis 取，与 sendcode 对应）
        String cachedcode = stringRedisTemplate.opsForValue().get(RedisConstant.LOGIN_CODE_KEY + phone);
        if (cachedcode == null || !cachedcode.equals(code)) {
            return ApiResults.fail(ErrorCode.VALIDATION_ERROR, "验证码不正确");
        }

        AppUser user = userMapper.findByPhone(phone);
        if (user == null) {
            return ApiResults.fail(ErrorCode.VALIDATION_ERROR, "用户不存在");
        }

        // AppUser → UserDVO（脱敏，不含 password 等敏感字段）
        UserDVO userDVO = new UserDVO();
        userDVO.setId(user.getId());
        userDVO.setName(user.getName());

        // 生成随机 token，UserDVO 以 Hash 存入 Redis，key = login:token:{token}
        String token = UUID.randomUUID().toString();
        String tokenKey = RedisConstant.LOGIN_TOKEN_KEY + token;

        // UserDVO → Map（StringRedisTemplate 的 hash 值必须是 String）
        Map<String, String> userMap = new HashMap<>();
        userMap.put("id", userDVO.getId());
        userMap.put("name", userDVO.getName());

        stringRedisTemplate.opsForHash().putAll(tokenKey, userMap);
        // putAll 不会设置过期，需单独 expire
        stringRedisTemplate.expire(tokenKey, RedisConstant.LOGIN_TOKEN_TTL , TimeUnit.MINUTES);

        // 验证码一次性，用完即删
        stringRedisTemplate.delete(RedisConstant.LOGIN_CODE_KEY + phone);

        // 返回 {user, token}：前端取 res.user 设登录态、res.token 存 localStorage 并随后续请求带回
        Map<String, Object> result = new HashMap<>();
        result.put("user", userDVO);
        result.put("token", token);
        return ApiResults.success(result);
    }

    @Override
    public ResponseEntity<?> login(LoginFormDTO loginFormDTO) {
        return ApiResults.success();
    }

}
