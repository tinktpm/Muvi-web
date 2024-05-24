package com.microservice.film_service.film_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("actor")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Actor {
    @Id
    private String id;

    private String name;
    private String image;

    public Actor(String name, String image){
        this.name = name;
        this.image = image;
    }
}
