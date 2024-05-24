package com.microservice.film_service.film_service.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document("movie")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Movie extends FilmModel{
    @Id
    private String id;
    private String video;
    private List<String> actors = new ArrayList<>();

    public Movie(String name, int duration, int firstYearRelease, String countryOfOrigin, String productionCompany,
                 Status status, List<Genre> genres, String description, List<String> actors){
        super(name, duration, firstYearRelease, countryOfOrigin, productionCompany, status, genres, description);
        this.setType(FilmType.MOVIE);
        this.actors = actors;
    }

    public Movie(String name, int duration, int firstYearRelease, String countryOfOrigin, String productionCompany,
                 Status status, List<Genre> genres, Date expectedReleaseDate, String description, List<String> actors){
        super(name, duration, firstYearRelease, countryOfOrigin, productionCompany, status, genres, description);
        this.setType(FilmType.MOVIE);
        this.actors = actors;
        if(expectedReleaseDate != null){
            this.setProperty(new ComingSoonProperty(expectedReleaseDate));
        }
    }

    public Movie(String id, String video, String banner, String name, int duration, int firstYearRelease, String countryOfOrigin, String productionCompany,
                 Status status, List<Genre> genres, Date expectedReleaseDate, String description, List<String> actors){
        super(name, duration, firstYearRelease, countryOfOrigin, productionCompany, status, genres, description);
        this.id = id;
        this.setBanner(banner);
        this.video = video;
        this.actors = actors;
        this.setType(FilmType.MOVIE);
        if(expectedReleaseDate != null){
            this.setProperty(new ComingSoonProperty(expectedReleaseDate));
        }
    }
}
