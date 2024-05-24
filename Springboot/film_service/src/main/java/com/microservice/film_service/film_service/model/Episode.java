package com.microservice.film_service.film_service.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;

@Document("episode")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Episode{
    @Id
    private String id;
    private String name;
    private int duration;
    private Status status;
    private int episodeNumber;
    private String video;
    private String seasonID;
    private String banner;

    @DocumentReference
    private ComingSoonProperty property = new ComingSoonProperty();

    private FilmType type = FilmType.EPISODE;
    public Episode(
            String name, int duration, Status status, int episodeNumber, String seasonID, Date expectedReleaseDate){
        this.name = name;
        this.status = status;
        this.duration = duration;
        this.episodeNumber = episodeNumber;
        this.seasonID = seasonID;
        this.setProperty(new ComingSoonProperty(expectedReleaseDate));
        this.setType(FilmType.EPISODE);
    }
    public Episode(
            String id, String video, String banner,
            String name, int duration,
            Status status, int episodeNumber, String seasonID, Date expectedReleaseDate){
        this.name = name;
        this.status = status;
        this.duration = duration;
        this.episodeNumber = episodeNumber;
        this.seasonID = seasonID;
        this.setType(FilmType.EPISODE);
        this.id = id;
        this.video = video;
        this.setBanner(banner);
        if(expectedReleaseDate != null){
            this.setProperty(new ComingSoonProperty(expectedReleaseDate));
        }
    }
}
