package com.amadeus.store.utils;

public class RedisConstant {

    /** 验证码 key 前缀：login:code:{phone} */
    public static final String  LOGIN_CODE_KEY = "login:code:";
    /** 验证码有效期（分钟） */
    public static final Long LOGIN_CODE_TTL = 2L;

    /** 登录态 key 前缀：login:token:{token} */
    public static final String LOGIN_TOKEN_KEY = "login:token:";
    /** 登录态有效期（分钟） */
    public static final Long LOGIN_TOKEN_TTL = 30L;


    public static final String CACHE_PRODUCT_LIST_KEY="cache:product:list";
    public static final Long CACHE_PRODUCT_TTL = 30L;

    /** 分类树缓存 key */
    public static final String CACHE_CATEGORY_TREE_KEY = "cache:category:tree";
    /** 分类树缓存有效期（分钟）——分类变动少，可比商品长一些 */
    public static final Long CACHE_CATEGORY_TTL = 60L;



}
