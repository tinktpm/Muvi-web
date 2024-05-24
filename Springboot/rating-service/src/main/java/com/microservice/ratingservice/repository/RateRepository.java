package com.microservice.ratingservice.repository;

import com.microservice.ratingservice.model.Rate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RateRepository extends MongoRepository<Rate, String> {
    Optional<Rate> findByUserIDAndFilmID(String userID, String filmID);
    List<Rate> findByFilmID(String filmID);
}
