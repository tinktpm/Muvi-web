package com.microservice.film_service.film_service.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microservice.film_service.film_service.ResponseMessage;
import com.microservice.film_service.film_service.client.EmailNotificationClient;
import com.microservice.film_service.film_service.model.FilmModel;
import com.microservice.film_service.film_service.model.Movie;
import com.microservice.film_service.film_service.model.Genre;
import com.microservice.film_service.film_service.model.Status;
import com.microservice.film_service.film_service.service.MovieService;
import com.mongodb.lang.Nullable;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.client.ReactorNettyWebSocketClient;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/api/v1/movie")
public class MovieController {
    @Autowired
    private MovieService movieService;
    @Autowired
    private EmailNotificationClient emailNotificationClient;
    private final ReactorNettyWebSocketClient webSocketClient = new ReactorNettyWebSocketClient();

//    Get films
    @GetMapping("/{id}")
    public ResponseEntity<Object> getFilm(@PathVariable String id){
        Movie film = movieService.getFilm(id);
        if(film != null){
            return ResponseMessage.createResponse(HttpStatus.OK, "GET MOVIE SUCCESSFULLY!", film);
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET MOVIE FAILED!", null);
    }

    @GetMapping("")
    public ResponseEntity<Object> getFilms(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "genres", required = false) List<Genre> genres,
            @RequestParam(value = "countries", required = false) List<String> countries,
            @RequestParam(value = "ratings", required = false) List<Integer> ratings,
            @RequestParam(value = "years", required = false) List<Integer> years,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size){
        try{
            List<Movie> films = movieService.getFilms(page, size, genres, name, countries, ratings, years);

            return ResponseMessage.createResponse(HttpStatus.OK, "GET MOVIES SUCCESSFULLY!", films);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET MOVIES FAILED!", null);
    }

//    Add film + upload film to cloudinary
    @PostMapping("")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> addMovie(@RequestParam("banner") MultipartFile banner,
                                          @RequestParam("video") MultipartFile video, @Nullable @RequestParam Date expectedReleaseDate,
                                          @RequestParam String name, @RequestParam int duration,@RequestParam int firstYearRelease,
                                          @RequestParam String countryOfOrigin, @RequestParam String productionCompany,
                                          @RequestParam Status status, @RequestParam("genres[]") List<String> genres,
                                          @RequestParam("actors[]") List<String> actors,
                                          @RequestParam(defaultValue = "") String description){
        try{
            List<Genre> genresList = new ArrayList<>();
            for(String i: genres){
                genresList.add(Genre.valueOf(i));
            }
            Movie film = new Movie(name, duration, firstYearRelease, countryOfOrigin, productionCompany,
                    status, genresList, expectedReleaseDate, description, actors);
            Movie addedFilm = movieService.addFilm(video, banner, film);
            if(addedFilm != null){
                return ResponseMessage.createResponse(HttpStatus.CREATED, "ADD MOVIE SUCCESSFULLY!", film);
            }
            return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "ADD MOVIE FAILED!", null);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "ADD MOVIE FAILED!", null);
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> updateMovie(@PathVariable String id, @RequestParam(value = "banner", required = false) MultipartFile banner,
                                              @RequestParam(value = "video", required = false) MultipartFile video, @Nullable @RequestParam Date expectedReleaseDate,
                                              @RequestParam String videoLink, @RequestParam String bannerLink,
                                              @RequestParam boolean isChangeVideo, @RequestParam boolean isChangeBanner,
                                              @RequestParam String name, @RequestParam int duration, @RequestParam int firstYearRelease,
                                              @RequestParam String countryOfOrigin, @RequestParam String productionCompany,
                                              @RequestParam Status status, @RequestParam("genres[]") List<String> genres,
                                              @RequestParam("actors[]") List<String> actors,
                                              @RequestParam(defaultValue = "") String description,
                                              @RequestHeader HttpHeaders headers){
        try {
            List<Genre> genresList = new ArrayList<>();
            for(String i: genres){
                genresList.add(Genre.valueOf(i));
            }
            Movie movie = new Movie(id, videoLink, bannerLink, name, duration, firstYearRelease, countryOfOrigin,
                    productionCompany, status, genresList, expectedReleaseDate, description, actors);
            Movie addedMovie = movieService.getFilm(id);
            Movie updatedMovie = movieService.editFilm(video, banner, movie, isChangeVideo, isChangeBanner);
            if(addedMovie != null){
                if(addedMovie.getStatus().name().equals("COMING_SOON") && updatedMovie.getStatus().name().equals("RELEASED")){
                    Map<String, Object> json = new HashMap<>();
                    json.put("filmTitle", updatedMovie.getName());
                    json.put("link", "localhost:8080/api/v1/movie/"+updatedMovie.getId());
                    json.put("banner", updatedMovie.getBanner());
                    json.put("emails", updatedMovie.getProperty().getRegisteredEmails());

                    emailNotificationClient.notifyFilm(json);
                    List<String> userIDs = updatedMovie.getProperty().getRegisterUserIds();
                    for(String userID: userIDs){
                        Map<String, Object> message = new HashMap<>();
                        message.put("userID", userID);
                        message.put("filmID", movie.getId());
                        URI serverUri = new URI("ws://localhost:8080/api/v1/film-notification");
                        webSocketClient.execute(
                            serverUri,
                            headers,
                            subSession -> {
                                try {
                                    return subSession.send(
                                        Mono.just(subSession.textMessage(new ObjectMapper().writeValueAsString(message)))
                                    ).then(
                                        subSession.receive()
                                            .map(WebSocketMessage::getPayloadAsText)
                                            .doOnNext(receivedMessage -> System.out.println("Received message: " + receivedMessage))
                                            .then()
                                    ).doOnError(error -> {
                                        System.out.print("Cannot connect to " + serverUri);
                                    });
                                } catch (JsonProcessingException e) {
                                    throw new RuntimeException(e);
                                }
                            }).subscribe();
                    }
                }
            }
            if(updatedMovie != null){
                return ResponseMessage.createResponse(HttpStatus.OK, "UPDATE MOVIE SUCCESSFULLY!", updatedMovie);
            }
        } catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "UPDATE MOVIE FAILED!", null);
    }

    @DeleteMapping("/{movieID}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> deleteMovie(@PathVariable String movieID){
        try{
            Movie movie = movieService.deleteFilm(movieID);
            if(movie != null){
                return ResponseMessage.createResponse(HttpStatus.NO_CONTENT, "DELETE MOVIE SUCCESSFULLY!!", movie);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "DELETE MOVIE FAILED!", null);
    }

    @PutMapping("/update-rate")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> updateRate(@RequestBody Map<String, Object> map){
        try {
            String movieID = map.get("id").toString();
            double rate = Double.parseDouble(map.get("rate").toString());

            Movie movie = movieService.updateRate(movieID, rate);
            if(movie != null) {
                return ResponseMessage.createResponse(HttpStatus.OK, "UPDATE RATE OF MOVIE SUCCESSFULLY!", movie);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "UPDATE RATE OF MOVIE FAILED!", null);
    }
}
