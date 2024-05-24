package com.microservice.notificationservice.controller;

import com.microservice.notificationservice.ResponseMessage;
import com.microservice.notificationservice.model.AccountNotification;
import com.microservice.notificationservice.model.CommentNotification;
import com.microservice.notificationservice.model.FilmNotification;
import com.microservice.notificationservice.service.AccountNotificationService;
import com.microservice.notificationservice.service.CommentNotificationService;
import com.microservice.notificationservice.service.FilmNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/notification")
public class NotificationController {

    @Autowired
    private FilmNotificationService filmNotificationService;

    @Autowired
    private AccountNotificationService accountNotificationService;

    @Autowired
    private CommentNotificationService commentNotificationService;

    @GetMapping("")
    public ResponseEntity<Object> getNotification(@RequestParam String userID,
                                                  @RequestParam(defaultValue = "0", required = false) int page,
                                                  @RequestParam(defaultValue = "10", required = false) int size){
        try {
            List<FilmNotification> filmNotifications = filmNotificationService.getFilmNotifications(userID, page, size);
            List<AccountNotification> accountNotifications = accountNotificationService.getAccountNotifications(userID, page, size);
            List<CommentNotification> commentNotifications = commentNotificationService.getNotifications(userID, page, size);

            Map<String, Object> result = new HashMap<>();
            result.put("film_notification", filmNotifications);
            result.put("account_notification", accountNotifications);
            result.put("comment_notification", commentNotifications);
            return ResponseMessage.createResponse(HttpStatus.OK, "GET NOTIFICATIONS SUCCESSFULLY!", result);
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "DON'T HAVE ANY NOTIFICATION!", null);
    }
}
