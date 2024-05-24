package com.microservice.film_service.film_service.repository;

import com.microservice.film_service.film_service.model.WatchList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WatchListRepository extends MongoRepository<WatchList, String> {
    List<WatchList> findByUserID(String userID);
    Optional<WatchList> findById(String id);
}
