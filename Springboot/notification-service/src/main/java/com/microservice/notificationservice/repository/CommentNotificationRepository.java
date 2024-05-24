package com.microservice.notificationservice.repository;

import com.microservice.notificationservice.model.CommentNotification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentNotificationRepository extends CrudRepository<CommentNotification, String> {
    Optional<CommentNotification> findById(String id);
    Page<CommentNotification> findByUserID(Pageable pageable, String userID);
}
