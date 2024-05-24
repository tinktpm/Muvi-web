package com.microservice.film_service.film_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "notification-service")
public interface EmailNotificationClient {
    @PostMapping(value = "/api/v1/email/notify-film", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> notifyFilm(@RequestBody Map<String, Object> object);
}
