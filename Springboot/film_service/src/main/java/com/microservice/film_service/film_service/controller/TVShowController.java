package com.microservice.film_service.film_service.controller;

import com.microservice.film_service.film_service.ResponseMessage;
import com.microservice.film_service.film_service.model.*;
import com.microservice.film_service.film_service.model.TVShow;
import com.microservice.film_service.film_service.service.TVShowService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/tv_show")
public class TVShowController {
    @Autowired
    private TVShowService tvShowService;
    
    @GetMapping("/{id}")
    public ResponseEntity<Object> getTVShow(@PathVariable String id){
        TVShow film = tvShowService.getTVShow(id);
        if(film != null){
            return ResponseMessage.createResponse(HttpStatus.OK, "GET TV SHOW SUCCESSFULLY!", film);
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET TV SHOW FAILED!", null);
    }

    @GetMapping("")
    public ResponseEntity<Object> getTVShows(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "genres", required = false) List<Genre> genres,
            @RequestParam(value = "countries", required = false) List<String> countries,
            @RequestParam(value = "ratings", required = false) List<Integer> ratings,
            @RequestParam(value = "years", required = false) List<Integer> years,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size){
        try{
            List<TVShow> films = tvShowService.getTVShows(page, size, genres, name, countries, ratings, years);
            return ResponseMessage.createResponse(HttpStatus.OK, "GET TV SHOW SUCCESSFULLY!", films);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET TV SHOW FAILED!", null);
    }

    //    Add film + upload film to cloudinary
    @PostMapping("")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> addTVShow(@RequestParam("banner") MultipartFile banner,
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
            TVShow film = new TVShow(name, duration, firstYearRelease, countryOfOrigin, productionCompany,
                    status, genresList, description, actors);
            TVShow addedFilm = tvShowService.addTVShow(banner, film);
            if(addedFilm != null){
                return ResponseMessage.createResponse(HttpStatus.CREATED, "ADD TV SHOW SUCCESSFULLY!", film);
            }
            return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "ADD TV SHOW FAILED!", null);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "ADD TV SHOW FAILED!", null);
    }
    //    Add film + upload film to cloudinary
    @PutMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> updateTVShow(@PathVariable String id, @RequestParam(value = "banner", required = false) MultipartFile banner,
                                            @RequestParam String bannerLink, @RequestParam boolean isChangeBanner,
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
            TVShow film = new TVShow(id, bannerLink, name, duration, firstYearRelease, countryOfOrigin, productionCompany,
                    status, genresList, description, actors);
            TVShow addedFilm = tvShowService.editTVShow(banner, film, isChangeBanner);
            if(addedFilm != null){
                return ResponseMessage.createResponse(HttpStatus.CREATED, "UPDATE TV SHOW SUCCESSFULLY!", film);
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "UPDATE TV SHOW FAILED!", null);
    }

    @DeleteMapping("/{tvShowID}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> deleteTVSHow(@PathVariable String tvShowID){
        try {
            TVShow tvShow = tvShowService.deleteTVShow(tvShowID);
            if(tvShow != null){
                return ResponseMessage.createResponse(HttpStatus.CREATED, "DELETE TV SHOW SUCCESSFULLY!", tvShow);
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "DELETE TV SHOW FAILED!", null);
    }

    @PutMapping("/update-rate")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> updateRate(@RequestBody Map<String, Object> map){

        try {
            String tvShowID = map.get("id").toString();
            double rate = Double.parseDouble(map.get("rate").toString());

            TVShow tvShow = tvShowService.updateRate(tvShowID, rate);
            if(tvShow != null) {
                return ResponseMessage.createResponse(HttpStatus.OK, "UPDATE RATE OF MOVIE SUCCESSFULLY!", tvShow);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "UPDATE RATE OF MOVIE FAILED!", null);
    }
}
