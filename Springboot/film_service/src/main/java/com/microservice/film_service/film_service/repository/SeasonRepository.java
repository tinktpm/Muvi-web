package com.microservice.film_service.film_service.repository;

import com.microservice.film_service.film_service.model.Season;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeasonRepository extends MongoRepository<Season, String> {
    List<Season> findByTvShowID(String tvShowID);
}
