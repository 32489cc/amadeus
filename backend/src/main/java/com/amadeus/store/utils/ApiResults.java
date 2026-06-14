package com.amadeus.store.utils;

import com.amadeus.store.dto.ApiResponse;
import com.amadeus.store.exception.ErrorCode;
import org.springframework.http.ResponseEntity;

/**
 * 统一响应工厂 —— 构造统一信封 {@link ApiResponse}（{@code {code, message, data}}）的
 * {@link ResponseEntity}。HTTP 状态与信封 {@code code} 始终一致：成功 200，失败取
 * {@link ErrorCode#status()}。
 *
 * <pre>
 *   return ApiResults.success(user);                          // 成功带数据
 *   return ApiResults.success();                              // 成功不带数据
 *   return ApiResults.fail(ErrorCode.UNPROCESSABLE, msg, x);  // 失败带数据
 *   return ApiResults.fail(ErrorCode.VALIDATION_ERROR, msg);  // 失败不带数据
 * </pre>
 */
public final class ApiResults {

    private ApiResults() {}

    /** 成功 · 带数据 */
    public static <T> ResponseEntity<ApiResponse<T>> success(T data) {
        return ResponseEntity.ok(new ApiResponse<>(200, "success", data));
    }

    /** 成功 · 不带数据 */
    public static ResponseEntity<ApiResponse<Void>> success() {
        return ResponseEntity.ok(new ApiResponse<>(200, "success", null));
    }

    /** 失败 · 带数据 */
    public static <T> ResponseEntity<ApiResponse<T>> fail(ErrorCode code, String message, T data) {
        return ResponseEntity.status(code.status())
                .body(new ApiResponse<>(code.status().value(), message, data));
    }

    /** 失败 · 不带数据 */
    public static ResponseEntity<ApiResponse<Void>> fail(ErrorCode code, String message) {
        return ResponseEntity.status(code.status())
                .body(new ApiResponse<>(code.status().value(), message, null));
    }
}
