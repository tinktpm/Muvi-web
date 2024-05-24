package com.microservice.notificationservice.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microservice.notificationservice.model.CustomPayload;
import com.microservice.notificationservice.model.FilmNotification;
import com.microservice.notificationservice.service.FilmNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class FilmNotificationWebSocketHandler implements WebSocketHandler {
    private final List<WebSocketSession> sessions = new ArrayList<>();

    @Autowired
    private FilmNotificationService filmNotificationService;

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        sessions.add(session);
        Flux<WebSocketMessage> flux = session.receive()
                .map(msg -> {
                    try {
                        CustomPayload payload = new ObjectMapper().readValue(
                                msg.getPayloadAsText(),
                                CustomPayload.class);

                        // Process the payload and create a new account notification
                        FilmNotification filmNotification = new FilmNotification(
                                "Film notification",
                                payload.getContent(),
                                LocalDateTime.now(),
                                payload.getUserID(),
                                "/film/"+payload.getFilmID(),
                                payload.getFilmID());

                        if(payload.getAction() != null){
                            if(payload.getAction().equals("read")){
                                FilmNotification stored = filmNotificationService.readNotification(payload.getNotificationID());
                                broadcastMessage(session, stored.toMap());
                                return new ObjectMapper().writeValueAsString(stored.toMap());
                            }
                        }
                        // Save the notification
                        FilmNotification stored = filmNotificationService.addFilmNotification(filmNotification);

                        // Serialize the stored notification as JSON string
                        broadcastMessage(session, stored.toMap());
                        return new ObjectMapper().writeValueAsString(stored.toMap());
                    } catch (JsonProcessingException e) {
                        e.printStackTrace();
                        throw new RuntimeException("Error processing WebSocket message", e);
                    }
                })
                .map(session::textMessage);
        return session.send(flux);
    }
    private void broadcastMessage(WebSocketSession currSession, Object message) {
        String jsonMessage;
        try {
            jsonMessage = new ObjectMapper().writeValueAsString(message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return;
        }

        sessions.forEach(session -> {
            if(session.isOpen() && session != currSession){
                session.send(Mono.just(session.textMessage(jsonMessage)))
                        .subscribe();
            }
        });
    }
}
