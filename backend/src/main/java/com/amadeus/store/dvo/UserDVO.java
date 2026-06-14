package com.amadeus.store.dvo;

import lombok.Data;

/**
 * 登录态对外视图对象（脱敏）—— 存入 Redis / 返回前端时用，<b>不含 password 等敏感字段</b>。
 */
@Data
public class UserDVO {

    private String id;
    private String name;
}
