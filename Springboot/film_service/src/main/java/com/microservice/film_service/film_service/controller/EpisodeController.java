package com.microservice.film_service.film_service.controller;

import com.microservice.film_service.film_service.ResponseMessage;
import com.microservice.film_service.film_service.client.EmailNotificationClient;
import com.microservice.film_service.film_service.model.Episode;
import com.microservice.film_service.film_service.model.Genre;
import com.microservice.film_service.film_service.model.Status;
import com.microservice.film_service.film_service.service.EpisodeService;
import com.mongodb.lang.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/v1/episode")
public class EpisodeController {

    @Autowired
    private EpisodeService episodeService;
    @Autowired
    private EmailNotificationClient emailNotificationClient;

    @GetMapping("/{id}")
    public ResponseEntity<Object> getEpisode(@PathVariable String id){
        Episode episode = episodeService.getEpisode(id);

        if(episode != null){
            return ResponseMessage.createResponse(HttpStatus.OK, "GET EPISODE SUCCESSFULLY!", episode);
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET EPISODE FAILED!", null);
    }

    @GetMapping("")
    public ResponseEntity<Object> getEpisodes(@RequestParam String seasonID){
        try{
            List<Episode> episodes = episodeService.getEpisodes(seasonID);
            return ResponseMessage.createResponse(HttpStatus.OK, "GET EPISODES SUCCESSFULLY!", episodes);
        }catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET EPISODES FAILED!", null);
    }

    @PostMapping("")
    public ResponseEntity<Object> addEpisode(@RequestParam("video") MultipartFile video, @RequestParam("banner") MultipartFile banner,
                                             @Nullable @RequestParam Date expectedReleaseDate,
                                             @RequestParam String name, @RequestParam int duration,
                                             @RequestParam Status status,
                                             @RequestParam(defaultValue = "1") int episodeNumber, @RequestParam String seasonID){
        try {
            Episode episode = new Episode(name, duration, status,
                    episodeNumber, seasonID, expectedReleaseDate);
            Episode addedEpisode = episodeService.addEpisode(video, banner, episode);
            if(addedEpisode != null){
                return ResponseMessage.createResponse(HttpStatus.CREATED, "ADD EPISODE SUCCESSFULLY!", addedEpisode);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "ADD EPISODE FAILED!", null);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEpisode(@RequestParam(value = "video", required = false) MultipartFile video, @RequestParam(value = "banner", required = false) MultipartFile banner,
                                                @Nullable @RequestParam Date expectedReleaseDate,
                                             @PathVariable String id, @RequestParam String videoLink, @RequestParam String bannerLink,
                                             @RequestParam boolean isChangeVideo, @RequestParam boolean isChangeBanner,
                                             @RequestParam String name, @RequestParam int duration,
                                             @RequestParam Status status,
                                             @RequestParam(defaultValue = "1") int episodeNumber, @RequestParam String seasonID){
        try {
            Episode episode = new Episode(id, videoLink, bannerLink, name, duration, status, episodeNumber, seasonID, expectedReleaseDate);
            Episode addedEpisode = episodeService.getEpisode(id);
            Episode updatedEpisode = episodeService.editEpisode(video, banner, episode, isChangeVideo, isChangeBanner);
            if(updatedEpisode != null){
                if(updatedEpisode.getStatus().name().equals("COMING_SOON") && addedEpisode.getStatus().name().equals("RELEASED")){
                    Map<String, Object> json = new HashMap<>();
                    json.put("filmTitle", updatedEpisode.getName());
                    json.put("link", "localhost:8080/api/v1/movie/"+updatedEpisode.getId());
                    json.put("banner", updatedEpisode.getBanner());
                    json.put("emails", updatedEpisode.getProperty().getRegisteredEmails());

                    emailNotificationClient.notifyFilm(json);
                }
            }
            if(updatedEpisode != null){
                return ResponseMessage.createResponse(HttpStatus.CREATED, "UPDATE EPISODE SUCCESSFULLY!", updatedEpisode);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "UPDATE EPISODE FAILED!", null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEpisode(@PathVariable String id){
        try {
            Episode episode = episodeService.deleteEpisode(id);
            if(episode != null){
                return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "DELETE EPISODE SUCCESSFULLY!", episode);
            }
        } catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "DELETE EPISODE FAILED!", null);
    }
}
