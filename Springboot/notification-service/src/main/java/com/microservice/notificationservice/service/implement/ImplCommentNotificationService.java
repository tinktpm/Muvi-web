package com.microservice.notificationservice.service.implement;

import com.microservice.notificationservice.model.CommentNotification;
import com.microservice.notificationservice.repository.CommentNotificationRepository;
import com.microservice.notificationservice.service.CommentNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImplCommentNotificationService implements CommentNotificationService {
    @Autowired
    private CommentNotificationRepository commentNotificationRepository;

    @Override
    public CommentNotification getNotification(String notificationID) {
        return commentNotificationRepository.findById(notificationID).orElse(null);
    }

    @Override
    public List<CommentNotification> getNotifications(String userID, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        return commentNotificationRepository.findByUserID(pageable, userID).getContent();
    }

    @Override
    public CommentNotification addNotification(CommentNotification commentNotification) {
        try{
            return commentNotificationRepository.save(commentNotification);
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public CommentNotification readNotification(String notificationID){

        try {
            CommentNotification commentNotification = getNotification(notificationID);
            if(commentNotification != null){
                commentNotification.setRead(true);
                return commentNotificationRepository.save(commentNotification);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
