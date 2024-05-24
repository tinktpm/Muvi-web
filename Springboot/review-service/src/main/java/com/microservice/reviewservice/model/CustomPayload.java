package com.microservice.reviewservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomPayload {
    private String id;
    private User user;
    private String filmID;
    private String content;
    private String replyCommentID;
    private String repliedUserID;
    private String action;

    public CustomPayload(User user, String filmID, String content, String action){
        this.user = user;
        this.filmID = filmID;
        this.content = content;
        this.action = action;
    }

    public CustomPayload(String ID, User user, String filmID, String content, String action){
        this.id = ID;
        this.user = user;
        this.filmID = filmID;
        this.content = content;
        this.action = action;
    }
}
