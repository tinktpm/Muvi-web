package com.microservice.notificationservice.service.implement;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.microservice.notificationservice.service.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class OTPServiceImpl implements OTPService {

    private static final Integer EXPIRE_MINS = 5;
    private final LoadingCache<String, Integer> optCache;

    public OTPServiceImpl() {
        optCache = CacheBuilder.newBuilder()
                .expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
                .build(new CacheLoader<String, Integer>() {
                    public Integer load(String key) {
                        return 0;
                    }
                });
    }

    public int generateOTP(String key) {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        optCache.put(key, otp);
        return otp;
    }

    public int getOTP(String key) {
        try {
            return optCache.get(key);
        } catch (Exception e) {
            return 0;
        }
    }

    public void clearOTP(String key, Map<String, Object> object) {
        Map<String, Object> status = new HashMap<>();
        status.put("email", object.get("email").toString());
        status.put("isBusy", true);
        optCache.invalidate(key);
    }
}
