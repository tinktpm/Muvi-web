package com.microservice.film_service.film_service.service;

import com.microservice.film_service.film_service.model.ComingSoonProperty;

import java.util.Date;

public interface ComingSoonPropertyService {
    public ComingSoonProperty getProperty(String id);
    public ComingSoonProperty addProperty(Date expectedReleaseDate);
    public ComingSoonProperty updateProperty(String id, String email, String userID);
}
