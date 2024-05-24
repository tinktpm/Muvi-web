package com.microservice.notificationservice.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microservice.notificationservice.model.CommentNotification;
import com.microservice.notificationservice.model.CustomPayload;
import com.microservice.notificationservice.service.CommentNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class CommentNotificationWebSocketHandler implements WebSocketHandler {
    private final List<WebSocketSession> sessions = new ArrayList<>();

    @Autowired
    private CommentNotificationService commentNotificationService;

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        sessions.add(session);

        Flux<WebSocketMessage> flux = session.receive()
                .map(webSocketMessage -> {
                    try {
                        CustomPayload payload = new ObjectMapper()
                                .readValue(
                                        webSocketMessage.getPayload().asInputStream().readAllBytes(),
                                        CustomPayload.class
                                );
                        CommentNotification commentNotification = new CommentNotification(
                                "A replied your comment",
                                payload.getContent(),
                                LocalDateTime.now(),
                                payload.getUserID(),
                                "/film/66200673fc13ae7cc6a242a2",
                                payload.getReplyCommentID());

                        if(payload.getAction() != null){
                            if(payload.getAction().equals("read")){
                                CommentNotification addedNotification = commentNotificationService.readNotification(payload.getNotificationID());

                                broadcastMessage(session, addedNotification.toMap());
                                return new ObjectMapper().writeValueAsString(addedNotification.toMap());
                            }
                        }

                        CommentNotification addedNotification = commentNotificationService.addNotification(commentNotification);
                        broadcastMessage(session, addedNotification.toMap());
                        return new ObjectMapper().writeValueAsString(addedNotification.toMap());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return null;
                })
                .map(msg -> session.textMessage(msg.toString()));
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
