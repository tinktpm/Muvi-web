package com.microservice.film_service.film_service.controller;

import com.microservice.film_service.film_service.ResponseMessage;
import com.microservice.film_service.film_service.client.EmailNotificationClient;
import com.microservice.film_service.film_service.model.Genre;
import com.microservice.film_service.film_service.model.Season;
import com.microservice.film_service.film_service.model.Status;
import com.microservice.film_service.film_service.service.SeasonService;
import com.mongodb.lang.Nullable;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/v1/season")
public class SeasonController {
    @Autowired
    private SeasonService seasonService;
    @Autowired
    private EmailNotificationClient emailNotificationClient;

    @GetMapping("/{id}")
    public ResponseEntity<Object> getSeason(@PathVariable String id){
        Season season = seasonService.getSeason(id);
        if(season != null){
            return ResponseMessage.createResponse(HttpStatus.OK, "GET SEASON SUCCESSFULLY!", season);
        }
        return ResponseMessage.createResponse(HttpStatus.OK, "GET SEASON FAILED!", null);
    }

    @GetMapping("")
    public ResponseEntity<Object> getSeasons(@RequestParam String tvShowID){
        try{
            List<Season> seasons = seasonService.getSeasons(tvShowID);
            return ResponseMessage.createResponse(HttpStatus.OK, "GET SEASON SUCCESSFULLY!", seasons);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET SEASON FAILED!", null);
    }

    @PostMapping("")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> addSeason(@RequestParam("banner") MultipartFile banner,
                                            @Nullable @RequestParam Date expectedReleaseDate,
                                            @RequestParam String name, @RequestParam int duration, @RequestParam int firstYearRelease,
                                            @RequestParam String countryOfOrigin, @RequestParam String productionCompany,
                                            @RequestParam Status status, @RequestParam("genres[]") List<String> genres,
                                            @RequestParam int seasonNumber, @RequestParam String tvShowID, @RequestParam(defaultValue = "") String description){
        try{
            List<Genre> genresList = new ArrayList<>();
            for(String i: genres){
                genresList.add(Genre.valueOf(i));
            }
            Season season = new Season(name, duration, firstYearRelease, countryOfOrigin, productionCompany, status, genresList, seasonNumber, tvShowID, expectedReleaseDate, description);
            Season addedSeason = seasonService.addSeason(banner, season);
            if(addedSeason != null){
                return ResponseMessage.createResponse(HttpStatus.CREATED, "ADD SEASON SUCCESSFULLY!", season);
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET SEASONS FAILED!", null);
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> updateSeason(@PathVariable String id, @RequestParam(value = "banner", required = false) MultipartFile banner,
                                               @Nullable @RequestParam Date expectedReleaseDate,
                                            @RequestParam boolean isChangeBanner, @RequestParam String bannerLink,
                                            @RequestParam String name, @RequestParam int duration, @RequestParam int firstYearRelease,
                                            @RequestParam String countryOfOrigin, @RequestParam String productionCompany,
                                            @RequestParam Status status, @RequestParam("genres[]") List<String> genres,
                                            @RequestParam int seasonNumber, @RequestParam String tvShowID, @RequestParam(defaultValue = "") String description){
        try{
            List<Genre> genresList = new ArrayList<>();
            for(String i: genres){
                genresList.add(Genre.valueOf(i));
            }
            Season season = new Season(id, bannerLink, name, duration, firstYearRelease, countryOfOrigin, productionCompany, status, genresList,
                    seasonNumber, tvShowID, expectedReleaseDate, description);

            Season addedSeason = seasonService.getSeason(id);
            Season updatedSeason = seasonService.editSeason(banner, season, isChangeBanner);
            if(updatedSeason != null){
                if(updatedSeason.getStatus().name().equals("COMING_SOON") && addedSeason.getStatus().name().equals("RELEASED")){
                    Map<String, Object> json = new HashMap<>();
                    json.put("filmTitle", updatedSeason.getName());
                    json.put("link", "localhost:8080/api/v1/movie/"+updatedSeason.getId());
                    json.put("banner", updatedSeason.getBanner());
                    json.put("emails", updatedSeason.getProperty().getRegisteredEmails());

                    emailNotificationClient.notifyFilm(json);
                }
            }
            if(updatedSeason != null){
                return ResponseMessage.createResponse(HttpStatus.CREATED, "UPDATE SEASON SUCCESSFULLY!", updatedSeason);
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "UPDATE SEASONS FAILED!", null);
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Object> deleteSeason(@PathVariable String id){
        try{
            Season season = seasonService.deleteSeason(id);
            if(season != null){
                return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "UPDATE SEASONS SUCCESSFULLY!", season);
            }
        } catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "DELETE SEASONS FAILED!", null);
    }
}
