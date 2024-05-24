package com.microservice.notificationservice.service.implement;

import com.microservice.notificationservice.model.FilmNotification;
import com.microservice.notificationservice.repository.FilmNotificationRepository;
import com.microservice.notificationservice.service.FilmNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImplFilmNotificationService implements FilmNotificationService {
    @Autowired
    private FilmNotificationRepository filmNotificationRepository;

    @Override
    public List<FilmNotification> getFilmNotifications(String userID, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        return filmNotificationRepository.findByUserID(pageable, userID).getContent();
    }

    @Override
    public FilmNotification getFilmNotification(String id) {
        return filmNotificationRepository.findById(id).orElse(null);
    }

    @Override
    public FilmNotification addFilmNotification(FilmNotification filmNotification) {
        try{
            return filmNotificationRepository.save(filmNotification);
        } catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public FilmNotification readNotification(String notificationID){
        try {
            FilmNotification filmNotification = getFilmNotification(notificationID);
            if(filmNotification != null){
                filmNotification.setRead(true);
                return filmNotificationRepository.save(filmNotification);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
