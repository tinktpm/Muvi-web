package com.microservice.film_service.film_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@Document("watch-list")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WatchList {
    @Id
    private String id;
    private String userID;
    private String name;

    @DocumentReference
    private List<Movie> movies = new ArrayList<>();

    @DocumentReference
    private List<TVShow> tvShows = new ArrayList<>();
    public WatchList(String userID, String name){
        this.userID = userID;
        this.name = name;
    }
}
