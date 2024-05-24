package com.microservice.notificationservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@Document("account-notification")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountNotification extends Notification{
    @Id
    private String id;

    public AccountNotification(String title, String content, LocalDateTime createdAt, String userID, String destination){
        super(title, content, createdAt, userID, destination);
    }

    public Map<String, Object> toMap(){
        Map<String, Object> map = new HashMap<>();
        map.put("id", this.id);
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
