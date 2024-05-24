package com.microservice.paymentservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String _id;
    private String name;
    private String password;
    private String email;
    private int gender;
    private Date birthdate;
    private String phoneNumber;
    private boolean isAdmin;
    private boolean isVip;
    private boolean isBlocked;
    private Date created_at;
}
