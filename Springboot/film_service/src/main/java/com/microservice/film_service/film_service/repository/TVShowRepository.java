package com.microservice.film_service.film_service.repository;

import com.microservice.film_service.film_service.model.TVShow;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TVShowRepository extends MongoRepository<TVShow, String> {
    Optional<TVShow> findById(String id);
}
