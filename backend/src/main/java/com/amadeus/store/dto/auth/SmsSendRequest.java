package com.amadeus.store.dto.auth;

/**
 * POST /api/auth/sms/send 的请求体 —— 契约 {@code { "phone": "09012345678" }}。
 *
 * @param phone 日本の携帯番号（ハイフン無し・先頭0の11桁）
 */
public record SmsSendRequest(String phone) {
}
