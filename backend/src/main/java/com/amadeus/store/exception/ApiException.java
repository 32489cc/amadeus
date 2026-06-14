package com.amadeus.store.exception;

/**
 * 业务异常 —— 持有 {@link ErrorCode}，由全局异常处理器据此决定 HTTP 状态与响应体
 * {@code {"error":{"code","message"}}}（契约「3. 共通レスポンス形式 / エラー」）。
 *
 * <p>消息策略：不传 message 时，可由处理器回退到 {@code ErrorCode} 的默认文案；
 * 传了 message 则用上下文化的自定义文案（如「電話番号の形式が正しくありません」）。
 */
public class ApiException extends RuntimeException {

    private final ErrorCode code;

    public ApiException(ErrorCode code, String message) {
        super(message);
        this.code = code;
    }

    public ApiException(ErrorCode code) {
        this(code, null);
    }

    public ErrorCode code() {
        return code;
    }
}
