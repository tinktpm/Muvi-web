package com.microservice.paymentservice.repository;

import com.microservice.paymentservice.model.Bill;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends MongoRepository<Bill, String> {
    List<Bill> findByUserID(String userID);
    Optional<Bill> findById(String id);
}
