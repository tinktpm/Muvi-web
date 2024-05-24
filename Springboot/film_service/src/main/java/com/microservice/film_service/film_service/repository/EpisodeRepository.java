package com.microservice.film_service.film_service.repository;

import com.microservice.film_service.film_service.model.Episode;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EpisodeRepository extends MongoRepository<Episode, String> {
    List<Episode> findBySeasonID(String seasonID);
}
