package com.microservice.viewservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("history_video")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoryFilm {
    @Id
    private String id;
    private String userID;
    private String filmID;
    private double duration;
    private LocalDateTime viewedAt;

    public HistoryFilm(String userID, String filmID, double duration, LocalDateTime viewedAt){
        this.userID = userID;
        this.filmID = filmID;
        this.duration = duration;
        this.viewedAt = viewedAt;
    }
}
