package com.microservice.film_service.film_service.service;

import com.microservice.film_service.film_service.model.Season;
import com.microservice.film_service.film_service.model.TVShow;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface SeasonService {
    public Season getSeason(String id);
    public List<Season> getSeasons(String tvShowID);
    public Season addSeason(MultipartFile banner, Season season) throws IOException;
    public Season editSeason(MultipartFile banner, Season season, boolean isChangeBanner) throws IOException;
    public Season deleteSeason(String id);
}
