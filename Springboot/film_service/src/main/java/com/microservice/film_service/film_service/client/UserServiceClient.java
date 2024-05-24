package com.microservice.film_service.film_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service")
public interface UserServiceClient {
    @GetMapping(value = "/api/v1/user/checkVip/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> checkUser(@PathVariable String id);
}
