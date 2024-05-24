package com.microservice.film_service.film_service.controller;

import com.microservice.film_service.film_service.ResponseMessage;
import com.microservice.film_service.film_service.model.ComingSoonProperty;
import com.microservice.film_service.film_service.model.Movie;
import com.microservice.film_service.film_service.model.TVShow;
import com.microservice.film_service.film_service.service.ComingSoonPropertyService;
import com.microservice.film_service.film_service.service.MovieService;
import com.microservice.film_service.film_service.service.TVShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/property")
public class ComingSoonPropertyController {
    @Autowired
    private ComingSoonPropertyService propertyService;

    @Autowired
    private MovieService movieService;

    @Autowired
    private TVShowService tvShowService;

    @PutMapping("/register")
    public ResponseEntity<Object> registerProperty(@RequestBody Map<String, Object> object){
        try {
            String pattern = "yyyy-MM-dd HH:mm:ss";

            SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);

            if(object.get("id") != null){
                ComingSoonProperty property = propertyService.updateProperty(
                        object.get("id").toString(),
                        object.get("email").toString(),
                        object.get("userID").toString());
                if(property != null){
                    return ResponseMessage.createResponse(HttpStatus.OK, "REGISTER FILM SUCCESSFULLY!", property);
                }
            }
            else{
                Date time = dateFormat.parse(object.get("expectedReleaseDate").toString());

                ComingSoonProperty property = propertyService.addProperty(time);
                property = propertyService.updateProperty(
                        property.getId(),
                        object.get("email").toString(),
                        object.get("userID").toString());

                String filmID = object.get("filmID").toString();
                if(object.get("type").toString().equals("MOVIE")){
                    Movie movie = movieService.updateExpectedReleaseDate(filmID, property);
                    if(movie != null){
                        return ResponseMessage.createResponse(HttpStatus.OK, "REGISTER FILM SUCCESSFULLY!", property);
                    }
                } else if(object.get("type").toString().equals("TV_SHOW")){
                    TVShow tvShow = tvShowService.updateExpectedReleaseDate(filmID, property);
                    if(tvShow != null){
                        return ResponseMessage.createResponse(HttpStatus.OK, "REGISTER FILM SUCCESSFULLY!", property);
                    }
                }
            }
        } catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "REGISTER FILM FAILED!", null);
    }
}
