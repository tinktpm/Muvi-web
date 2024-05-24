package com.microservice.ratingservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "film-service")
public interface FilmServiceClient {
    @PutMapping(value = "/api/v1/movie/update-rate", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateRateMovie(@RequestBody Map<String, Object> map);

    @PutMapping(value = "/api/v1/tv_show/update-rate", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateRateTvShow(@RequestBody Map<String, Object> map);
}
