package com.microservice.film_service.film_service.service;

import com.microservice.film_service.film_service.model.ComingSoonProperty;
import com.microservice.film_service.film_service.model.Genre;
import com.microservice.film_service.film_service.model.Movie;
import com.microservice.film_service.film_service.model.Status;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MovieService {
    public Movie getFilm(String id);
    public Movie updateExpectedReleaseDate(String movieID, ComingSoonProperty property);
    public List<Movie> getFilmByStatus(Status status, int page, int size);
    public List<Movie> getFilms(int page, int size, List<Genre> genres, String name, List<String> countries, List<Integer> ratings, List<Integer> years);
    public Movie addFilm(MultipartFile video, MultipartFile banner, Movie film) throws IOException;
    public Movie editFilm(MultipartFile video, MultipartFile banner, Movie film, boolean isChangeVideo, boolean isChangeBanner);
    public Movie updateRate(String movieID, double rate);
    public Movie deleteFilm(String id);
}
