package com.microservice.film_service.film_service.service;

import com.microservice.film_service.film_service.model.Movie;
import com.microservice.film_service.film_service.model.TVShow;
import com.microservice.film_service.film_service.model.WatchList;

import java.util.List;

public interface WatchListService {
    public List<WatchList> getWatchListsByUserID(String userID);
    public WatchList getWatchListById(String id);
    public WatchList addWatchList(WatchList watchList);
    public WatchList addMovieIntoWatchList(String id, Movie film);
    public WatchList removeMovieFromWatchList(String id, Movie film);
    public WatchList addTVShowIntoWatchList(String id, TVShow film);
    public WatchList removeTVShowFromWatchList(String id, TVShow film);
    public boolean removeWatchList(String id);
}
