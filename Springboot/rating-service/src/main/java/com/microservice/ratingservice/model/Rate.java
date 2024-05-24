package com.microservice.ratingservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("rate")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rate {
    @Id
    private String id;

    private String userID;
    private String filmID;
    private int score;

}
