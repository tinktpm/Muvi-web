package com.microservice.film_service.film_service.service;

import com.microservice.film_service.film_service.model.ComingSoonProperty;
import com.microservice.film_service.film_service.model.Genre;
import com.microservice.film_service.film_service.model.Status;
import com.microservice.film_service.film_service.model.TVShow;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TVShowService {
    public TVShow getTVShow(String id);
    public TVShow updateExpectedReleaseDate(String tvShowID, ComingSoonProperty property);
    public List<TVShow> getTVShowByStatus(Status status, int page, int size);
    public List<TVShow> getTVShows(int page, int size, List<Genre> genres, String name, List<String> countries, List<Integer> ratings, List<Integer> years);
    public TVShow addTVShow(MultipartFile banner, TVShow tvShow) throws Exception;
    public TVShow editTVShow(MultipartFile banner, TVShow tvShow, boolean isChangeBanner);
    public TVShow updateRate(String tvShowID, double rate);
    public TVShow deleteTVShow(String tvShowID);
}
