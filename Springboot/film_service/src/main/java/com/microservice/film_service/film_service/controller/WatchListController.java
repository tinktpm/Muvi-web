package com.microservice.film_service.film_service.controller;

import com.microservice.film_service.film_service.ResponseMessage;
import com.microservice.film_service.film_service.model.Movie;
import com.microservice.film_service.film_service.model.TVShow;
import com.microservice.film_service.film_service.model.WatchList;
import com.microservice.film_service.film_service.service.MovieService;
import com.microservice.film_service.film_service.service.TVShowService;
import com.microservice.film_service.film_service.service.WatchListService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/watchlist")
public class WatchListController {
    @Autowired
    private WatchListService watchListService;

    @Autowired
    private MovieService movieService;

    @Autowired
    private TVShowService tvShowService;

    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> getWatchList(@PathVariable String id){
        try {
            WatchList watchList = watchListService.getWatchListById(id);
            if(watchList != null){
                return ResponseMessage.createResponse(HttpStatus.OK, "GET WATCHLIST SUCCESSFULLY!", watchList);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET WATCHLIST FAILED!", null);
    }

    @GetMapping("")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> getWatchListsByUser(@RequestParam String userID){
        try {
            List<WatchList> watchLists = watchListService.getWatchListsByUserID(userID);
            return ResponseMessage.createResponse(HttpStatus.OK, "GET WATCHLIST SUCCESSFULLY!", watchLists);

        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET WATCHLIST FAILED!", null);
    }

    @PostMapping("")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> addWatchList(@RequestBody WatchList watchList){
        try {
            System.out.println(watchList);
            WatchList addedWatchList = watchListService.addWatchList(watchList);
            if(watchList != null){
                return ResponseMessage.createResponse(HttpStatus.OK, "ADD WATCHLIST SUCCESSFULLY!", addedWatchList);
            }
            return ResponseMessage.createResponse(HttpStatus.NO_CONTENT, "ADD WATCHLIST FAILED, YOU CAN ONLY HAVE 5 WATCHLIST, PLEASE UPGRADE TO VIP TO CAN CREATE MORE THAN!", null);

        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "ADD WATCHLIST FAILED!", null);
    }

    @PutMapping("/{action}/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> addFilmWatchList(@PathVariable String action, @PathVariable String id, @RequestBody Map<String, Object> object){
        Movie movie = null;
        TVShow tvShow = null;
        WatchList addedWatchList = null;
        String filmID = object.get("filmID").toString();
        if(movieService.getFilm(filmID) != null){
            movie = movieService.getFilm(filmID);
        }
        else if(tvShowService.getTVShow(filmID) != null){
            tvShow = tvShowService.getTVShow(filmID);
        }
        if(action.equals("add")){
            try {
                if(movie != null){
                    addedWatchList = watchListService.addMovieIntoWatchList(id, movie);
                }
                else if(tvShow != null){
                    addedWatchList = watchListService.addTVShowIntoWatchList(id, tvShow);
                }
                if(addedWatchList != null){
                    return ResponseMessage.createResponse(HttpStatus.OK, "ADD FILM INTO WATCHLIST SUCCESSFULLY!", addedWatchList);
                }
                return ResponseMessage.createResponse(HttpStatus.NO_CONTENT, "ADD FILM INTO WATCHLIST FAILED, YOU CAN ONLY HAVE 5 FILM IN WATCHLIST, PLEASE UPGRADE TO CAN ADD MORE THAN!", null);

            } catch (Exception e){
                e.printStackTrace();
            }
            return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "ADD FILM INTO WATCHLIST FAILED!", null);
        }
        else if(action.equals("remove")){
            try {
                if(movie != null){
                    addedWatchList = watchListService.removeMovieFromWatchList(id, movie);
                }
                else if(tvShow != null){
                    addedWatchList = watchListService.removeTVShowFromWatchList(id, tvShow);
                }
                if(addedWatchList != null){
                    return ResponseMessage.createResponse(HttpStatus.OK, "REMOVE FILM INTO WATCHLIST SUCCESSFULLY!", addedWatchList);
                }
                return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "REMOVE FILM INTO WATCHLIST FAILED!", null);

            } catch (Exception e){
                e.printStackTrace();
            }
            return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "REMOVE FILM INTO WATCHLIST FAILED!", null);
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "ACTION ISN'T CORRECT!", null);
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> removeWatchList(@PathVariable String id){
        try {
            boolean isSuccess = watchListService.removeWatchList(id);
            if(isSuccess){
                return ResponseMessage.createResponse(HttpStatus.OK, "REMOVE WATCHLIST SUCCESSFULLY!", true);
            }
            return ResponseMessage.createResponse(HttpStatus.OK, "REMOVE WATCHLIST FAILED!", null);

        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "REMOVE WATCHLIST FAILED!", null);
    }
}
