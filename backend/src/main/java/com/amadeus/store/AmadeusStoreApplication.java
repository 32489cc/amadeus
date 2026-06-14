package com.amadeus.store;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * AMADEUS ストア — Spring Boot 启动类。
 *
 * <p>{@code @MapperScan} 扫描 {@code mapper} 包下的 MyBatis Mapper 接口，
 * 这样接口上不必逐个标注 {@code @Mapper}。
 */
@SpringBootApplication
@MapperScan("com.amadeus.store.mapper")
//@MapperScan 的作用：让 MyBatis 去扫描 com.amadeus.store.mapper这个包，为里面每个接口自动注册一个 bean
public class AmadeusStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(AmadeusStoreApplication.class, args);
    }
}
