package com.microservice.film_service.film_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@FeignClient(name = "view-service")
public interface ViewClient {

    @GetMapping("/api/v1/list_history_film")
    ResponseEntity<String> getListHistoryFilm(@RequestParam String userID);
    @PutMapping(value = "/api/v1/list_history_film/{userID}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addFilmIntoListHistoryVideo(@PathVariable String userID, @RequestBody Map<String, String> film);
}
