package com.amadeus.store.utils;

public class RegeUtils {


    public static boolean isPhonevaild(String phone){
        return phone != null && phone.matches(RegePatterns.MOBILE_PHONE);
    }

}
