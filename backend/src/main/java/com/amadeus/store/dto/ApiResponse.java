package com.amadeus.store.dto;

/**
 * 统一响应信封 —— 所有接口（成功 / 失败）都返回这一个形状。
 *
 * <pre>
 * 成功: { "code": 200, "message": "success", "data": { ... } }
 * 失败: { "code": 400, "message": "電話番号の形式が正しくありません", "data": null }
 * </pre>
 *
 * <p>约定（HTTP 码对齐）：{@code code} 与 HTTP 状态码一致——成功 200，失败用对应的
 * 4xx/5xx（见 {@link com.amadeus.store.exception.ErrorCode}）。HTTP 响应状态本身也同步
 * 设成同一个值，由工厂 {@link com.amadeus.store.utils.ApiResults} 负责。
 *
 * <p>本类只是数据形状，<b>不要手 {@code new}</b>——统一走 {@link com.amadeus.store.utils.ApiResults}。
 *
 * @param <T>     data 的类型
 * @param code    业务/HTTP 状态码
 * @param message 提示文案（成功固定 "success"，失败为可读错误信息）
 * @param data    业务数据；无数据时为 {@code null}
 */
public record ApiResponse<T>(int code, String message, T data) {
}
