package com.microservice.film_service.film_service.service.implement;

import com.microservice.film_service.film_service.model.Actor;
import com.microservice.film_service.film_service.repository.ActorRepository;
import com.microservice.film_service.film_service.service.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImplActorService implements ActorService {
    @Autowired
    private ActorRepository actorRepository;

    @Override
    public Actor getActor(String id) {
        return actorRepository.findById(id).orElse(null);
    }

    @Override
    public Actor addActor(Actor actor) {
        try {
            return actorRepository.insert(actor);
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
