package com.microservice.film_service.film_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "recommendation-service")
public interface RecommendationClient {
    @GetMapping(value = "/api/v1/recommendation", consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<String> getRecommendation(@RequestParam String userID, @RequestParam String title);
}
