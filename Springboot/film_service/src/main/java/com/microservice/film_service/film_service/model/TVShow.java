package com.microservice.film_service.film_service.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@Document("tv_show")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TVShow extends FilmModel{
    @Id
    private String id;
    private List<String> actors = new ArrayList<>();

    public TVShow(String name, int duration, int firstYearRelease, String countryOfOrigin, String productionCompany,
                  Status status, List<Genre> genres, String description, List<String> actors){
        super(name, duration, firstYearRelease, countryOfOrigin, productionCompany, status, genres, description);
        this.setType(FilmType.TV_SHOW);
        this.actors = actors;
    }

    public TVShow(String id, String banner, String name, int duration, int firstYearRelease, String countryOfOrigin,
                  String productionCompany, Status status, List<Genre> genres, String description, List<String> actors){
        super(name, duration, firstYearRelease, countryOfOrigin, productionCompany, status, genres, description);
        this.id = id;
        this.setBanner(banner);
        this.setType(FilmType.TV_SHOW);
        this.actors = actors;
    }
}
