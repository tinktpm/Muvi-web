package com.microservice.notificationservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomPayload {
    private String id;
    private String notificationID;
    private String userID;
    private String filmID;
    private String content;
    private String replyCommentID;
    private String action;

    public CustomPayload(String userID, String filmID, String content, String action){
        this.userID = userID;
        this.filmID = filmID;
        this.content = content;
        this.action = action;
    }

    public CustomPayload(String ID, String userID, String filmID, String content, String action){
        this.id = ID;
        this.userID = userID;
        this.filmID = filmID;
        this.content = content;
        this.action = action;
    }

    public CustomPayload(String action, String notificationID) {
        this.action = action;
        this.notificationID = notificationID;
    }
}
