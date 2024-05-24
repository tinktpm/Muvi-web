package com.microservice.notificationservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Document("comment-notification")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentNotification extends Notification{
    @Id
    private String id;

    private String commentID;

    public CommentNotification(String title, String content, LocalDateTime createdAt, String userID, String destination, String commentID){
        super(title, content, createdAt, userID, destination);
        this.commentID = commentID;
    }

    public CommentNotification(String commentID){
        this.commentID = commentID;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("commentID", commentID);
        map.put("title", this.getTitle());
        map.put("content", this.getContent());
        Date date = Date.from(this.getCreatedAt().atZone(ZoneId.systemDefault()).toInstant());
        map.put("createdAt", date);
        map.put("userID", this.getUserID());
        map.put("destination", this.getDestination());
        map.put("read", this.isRead());
        return map;
    }

}
