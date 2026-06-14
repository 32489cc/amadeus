package com.amadeus.store.exception;

import org.springframework.http.HttpStatus;

/**
 * 业务错误码 —— 与契约「3. 共通レスポンス形式 / エラー」的状态码对照表一一对应。
 *
 * <p>枚举名即写入 {@code error.code} 的字符串；{@link #status} 为对应 HTTP 状态码。
 * 在异常类里持有本枚举，全局异常处理器据此同时决定 HTTP 状态和响应体的 {@code code}。
 *
 * <p>这里只收录契约表里的<b>通用码</b>；业务特定码（如短信登录的 {@code INVALID_CODE}）
 * 可按需扩充——只要前后端在契约里对齐即可。
 */
public enum ErrorCode {

    VALIDATION_ERROR(HttpStatus.BAD_REQUEST),        // 400 リクエストパラメータ不正
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED),           // 401 未認証 / トークン失効
    FORBIDDEN(HttpStatus.FORBIDDEN),                 // 403 権限不足
    NOT_FOUND(HttpStatus.NOT_FOUND),                 // 404 リソース未存在
    CONFLICT(HttpStatus.CONFLICT),                   // 409 重複
    UNPROCESSABLE(HttpStatus.UNPROCESSABLE_ENTITY),  // 422 ビジネスロジックエラー
    RATE_LIMITED(HttpStatus.TOO_MANY_REQUESTS),      // 429 レート超過
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR);// 500 サーバーエラー

    private final HttpStatus status;

    ErrorCode(HttpStatus status) {
        this.status = status;
    }

    public HttpStatus status() {
        return status;
    }
}
