package com.amadeus.store.utils;

/**
 * 常用正则模式的集中定义。
 *
 * <p>抽象类：仅作常量容器，不应被实例化。用法 {@code str.matches(RegePatterns.EMAIL)}。
 */
public abstract class RegePatterns {

    /**
     * 日本の携帯電話番号 —— ハイフン無し・先頭0の11桁（070 / 080 / 090）。
     * 契約「POST /api/auth/sms/send」の {@code phone} に準拠。
     * 例: {@code 09012345678}
     */
    public static final String MOBILE_PHONE = "^0[789]0\\d{8}$";

    /**
     * メールアドレス —— 実用的な簡易パターン（ローカル部@ドメイン.TLD）。
     * RFC 5322 完全準拠ではなく、一般的な誤入力を弾く目的。
     * 例: {@code you@example.com}
     */
    public static final String EMAIL = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
}
