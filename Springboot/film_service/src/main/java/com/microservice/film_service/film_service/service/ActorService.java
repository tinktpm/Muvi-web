package com.microservice.film_service.film_service.service;

import com.microservice.film_service.film_service.model.Actor;

public interface ActorService {
    public Actor getActor(String id);
    public Actor addActor(Actor actor);
}
