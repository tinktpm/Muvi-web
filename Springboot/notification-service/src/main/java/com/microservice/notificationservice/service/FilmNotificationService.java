package com.microservice.notificationservice.service;

import com.microservice.notificationservice.model.FilmNotification;

import java.util.List;

public interface FilmNotificationService {
    public List<FilmNotification> getFilmNotifications(String userID, int page, int size);
    public FilmNotification getFilmNotification(String id);
    public FilmNotification addFilmNotification(FilmNotification filmNotification);
    public FilmNotification readNotification(String notificationID);
}
