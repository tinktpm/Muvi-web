package com.microservice.film_service.film_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilmModel {

    private String name;
    private int duration;
    private int firstYearRelease;
    private String countryOfOrigin;
    private String productionCompany;
    private String banner;
    private Status status;
    private FilmType type;
    private String description;
    private double rate = 0;

    @DocumentReference
    private ComingSoonProperty property = new ComingSoonProperty();

    private List<Genre> genres;

    public FilmModel(String name, int duration, int firstYearRelease, String countryOfOrigin, String productionCompany, Status status, List<Genre> genres, String description) {
        this.name = name;
        this.duration = duration;
        this.firstYearRelease = firstYearRelease;
        this.countryOfOrigin = countryOfOrigin;
        this.productionCompany = productionCompany;
        this.status = status;
        this.genres = genres;
        this.description = description;
    }
}
