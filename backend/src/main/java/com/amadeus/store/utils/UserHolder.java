package com.amadeus.store.utils;

import com.amadeus.store.dvo.UserDVO;

/**
 * 当前登录用户的 ThreadLocal holder。拦截器在 preHandle 里 saveUser、afterCompletion 里 removeUser，
 * 业务层用 getUser() 取当前用户（脱敏视图 UserDVO，不含 password）。
 */
public class UserHolder {

    private static final ThreadLocal<UserDVO> tl = new ThreadLocal<>();

    public static void saveUser(UserDVO user) {
        tl.set(user);
    }

    public static UserDVO getUser() {
        return tl.get();
    }

    public static void removeUser() {
        tl.remove();
    }
}
