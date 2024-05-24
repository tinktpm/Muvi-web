package com.microservice.notificationservice.service;

import java.util.Map;

public interface OTPService {
    public int generateOTP(String key);
    public int getOTP(String key);
    public void clearOTP(String key, Map<String, Object> object);
}
