package com.microservice.film_service.film_service.service;

import com.microservice.film_service.film_service.model.Episode;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface EpisodeService {
    public Episode getEpisode(String id);
    public List<Episode> getEpisodes(String seasonID);
    public Episode addEpisode(MultipartFile video, MultipartFile banner, Episode episode) throws IOException;
    public Episode editEpisode(MultipartFile video, MultipartFile banner, Episode episode, boolean isChangeVideo, boolean isChangeBanner) throws IOException;
    public Episode deleteEpisode(String id);
}
