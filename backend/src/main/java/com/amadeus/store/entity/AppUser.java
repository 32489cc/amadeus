package com.amadeus.store.entity;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AppUser {

    private String id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String memberRank;        // ← member_rank
    private Integer pointBalance;     // ← point_balance
    private Integer pointRate;        // ← point_rate
    private Boolean newsletter;       
    private LocalDateTime createdAt;  // ← created_at
    private LocalDateTime updatedAt;  // ← updated_at


}
