package com.microservice.film_service.film_service.controller;

import com.microservice.film_service.film_service.ResponseMessage;
import com.microservice.film_service.film_service.client.RecommendationClient;
import com.microservice.film_service.film_service.client.ViewClient;
import com.microservice.film_service.film_service.model.FilmModel;
import com.microservice.film_service.film_service.model.Movie;
import com.microservice.film_service.film_service.model.Status;
import com.microservice.film_service.film_service.model.TVShow;
import com.microservice.film_service.film_service.service.MovieService;
import com.microservice.film_service.film_service.service.TVShowService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/v1/film")
public class FilmController {
    @Autowired
    private RecommendationClient recommendationClient;

    @Autowired
    private ViewClient viewClient;

    @Autowired
    private MovieService movieService;

    @Autowired
    private TVShowService tvShowService;

    @GetMapping("")
    public ResponseEntity<Object> getFilms(@RequestParam(defaultValue = "", required = false) String userID,
                                           @RequestParam(defaultValue = "0", required = false) int page,
                                           @RequestParam(defaultValue = "12", required = false) int size){
        try{
            if(userID.isEmpty()){List<Movie> movies = movieService.getFilms(page, size, new ArrayList<>(), "", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
                List<FilmModel> films = new ArrayList<>();
                List<TVShow> tvShows = tvShowService.getTVShows(page, size, new ArrayList<>(), "", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

                for(Movie movie: movies){
                    if(movie != null){
                        films.add(movie);
                    }
                }
                for(TVShow tvShow: tvShows){
                    if(tvShow != null){
                        films.add(tvShow);
                    }
                }

                List<FilmModel> result = films.stream().filter(Objects::nonNull)
                        .sorted(Comparator.comparing(FilmModel::getFirstYearRelease).reversed()).toList();
                return ResponseMessage.createResponse(HttpStatus.OK, "USER HAVEN'T SEEN ANY FILM BEFORE, RECOMMEND BY THE NEW FILMS", result);
            }
            ResponseEntity<String> historyFilmResponse = viewClient.getListHistoryFilm(userID);
            JSONObject historyFilmJson = new JSONObject(historyFilmResponse.getBody());
            Map<String, Object> historyFilmMap = historyFilmJson.toMap();
            List<Object> listHistoryFilm = new ArrayList<>();
            if(historyFilmMap.get("data") != null){
                listHistoryFilm = (List<Object>) historyFilmMap.get("data");
                List<String> listTitle = new ArrayList<>();
                for(Object object: listHistoryFilm){
                    Map<String, Object> historyFilm = (Map<String, Object>) object;
                    String filmID = historyFilm.get("filmID").toString();
                    FilmModel film = null;
                    if(movieService.getFilm(filmID) != null){
                        film = movieService.getFilm(filmID);
                    } else if (tvShowService.getTVShow(filmID) != null) {
                        film = tvShowService.getTVShow(filmID);
                    }
                    if(film != null){
                        listTitle.add(film.getName());
                    }
                }

                List<FilmModel> films = new ArrayList<>();
                for(String title: listTitle){
                    ResponseEntity<String> response = recommendationClient.getRecommendation(userID, title);
                    JSONObject jsonObject = new JSONObject(response.getBody());

                    Map<String, Object> data = jsonObject.getJSONObject("data").toMap();

                    List<String> movieIDs = new ArrayList<>();
                    List<String> tvShowIDs = new ArrayList<>();

                    if(data.get("movie") != null){
                        movieIDs = (List<String>) data.get("movie");
                    }
                    if(data.get("tv_show") != null){
                        tvShowIDs = (List<String>) data.get("tv_show");
                    }

                    for(String id: movieIDs){
                        Movie movie = movieService.getFilm(id);
                        if(movie != null){
                            films.add(movie);
                        }
                    }
                    for(String id: tvShowIDs){
                        TVShow tvShow = tvShowService.getTVShow(id);
                        if(tvShow != null){
                            films.add(tvShow);
                        }
                    }
                }

                if(films.isEmpty()){
                    List<Movie> movies = movieService.getFilms(page, size, new ArrayList<>(), "", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
                    List<TVShow> tvShows = tvShowService.getTVShows(page, size, new ArrayList<>(), "", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

                    for(Movie movie: movies){
                        if(movie != null){
                            films.add(movie);
                        }
                    }
                    for(TVShow tvShow: tvShows){
                        if(tvShow != null){
                            films.add(tvShow);
                        }
                    }

                    List<FilmModel> result = films.stream().filter(Objects::nonNull)
                            .sorted(Comparator.comparing(FilmModel::getFirstYearRelease).reversed()).toList();
                    return ResponseMessage.createResponse(HttpStatus.OK, "USER HAVEN'T SEEN ANY FILM BEFORE, RECOMMEND BY THE NEW FILMS", result);
                }

                return ResponseMessage.createResponse(HttpStatus.OK, "GET FILMS SUCCESSFULLY!", films);
            }

        }catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET FILMS FAILED!", null);
    }

    @GetMapping("/coming_soon")
    public ResponseEntity<Object> getComingSoonFilm(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "5", required = false) int size
    ) {
        try {
            Map<String, Object> map = new HashMap<>();
            List<Movie> movies = movieService.getFilmByStatus(Status.COMING_SOON, page, size);
            List<TVShow> tvShows = tvShowService.getTVShowByStatus(Status.COMING_SOON, page, size);

            map.put("movies", movies);
            map.put("tvShows", tvShows);

            return ResponseMessage.createResponse(HttpStatus.OK, "GET FILMS SUCCESSFULLY!", map);

        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET COMING SOON FAILED!", null);
    }
}
