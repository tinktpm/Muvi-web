package com.microservice.film_service.film_service.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document("season")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Season extends FilmModel{
    @Id
    private String id;
    private int seasonNumber;
    private String tvShowID;

    public Season(String name, int duration, int firstYearRelease, String countryOfOrigin, String productionCompany,
                  Status status, List<Genre> genres, int seasonNumber, String tvShowID, Date expectedReleaseDate, String description){
        super(name, duration, firstYearRelease, countryOfOrigin, productionCompany, status, genres, description);
        this.seasonNumber = seasonNumber;
        this.tvShowID = tvShowID;
        this.setType(FilmType.SEASON);
        if(expectedReleaseDate != null){
            this.setProperty(new ComingSoonProperty(expectedReleaseDate));
        }
    }

    public Season(String id, String banner, String name, int duration, int firstYearRelease, String countryOfOrigin, String productionCompany,
                  Status status, List<Genre> genres, int seasonNumber, String tvShowID, Date expectedReleaseDate, String description){
        super(name, duration, firstYearRelease, countryOfOrigin, productionCompany, status, genres, description);
        this.seasonNumber = seasonNumber;
        this.tvShowID = tvShowID;
        this.id = id;
        this.setBanner(banner);
        this.setType(FilmType.SEASON);
        if(expectedReleaseDate != null){
            this.setProperty(new ComingSoonProperty(expectedReleaseDate));
        }
    }
}
