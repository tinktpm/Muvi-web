package com.microservice.notificationservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String userID;
    private String destination; //link UI
    private boolean isRead = false;

    public Notification(String title, String content, LocalDateTime createdAt, String userID, String destination) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.userID = userID;
        this.destination = destination;
    }
}
