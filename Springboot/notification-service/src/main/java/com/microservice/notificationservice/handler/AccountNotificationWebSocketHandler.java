package com.microservice.notificationservice.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microservice.notificationservice.model.AccountNotification;
import com.microservice.notificationservice.model.CustomPayload;
import com.microservice.notificationservice.service.AccountNotificationService;
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
public class AccountNotificationWebSocketHandler implements WebSocketHandler {
    private final List<WebSocketSession> sessions = new ArrayList<>();
    @Autowired
    private AccountNotificationService accountNotificationService;
    
    @Override
    public Mono<Void> handle(WebSocketSession session) {
        sessions.add(session);

        Flux<WebSocketMessage> flux = session.receive()
                .map(webSocketMessage -> {
                    try {
                        CustomPayload payload = new ObjectMapper().readValue(
                                webSocketMessage.getPayloadAsText(),
                                CustomPayload.class);

                        // Process the payload and create a new account notification
                        AccountNotification accountNotification = new AccountNotification(
                                "Account notification",
                                payload.getContent(),
                                LocalDateTime.now(),
                                payload.getUserID(),
                                "/film/66200673fc13ae7cc6a242a2");

                        if(payload.getAction() != null){
                            if(payload.getAction().equals("read")){
                                AccountNotification storedNotification = accountNotificationService.readNotification(payload.getNotificationID());
                                broadcastMessage(session, storedNotification.toMap());
                                return new ObjectMapper().writeValueAsString(storedNotification.toMap());
                            }
                        }
                        // Save the notification
                        AccountNotification storedNotification = accountNotificationService.addAccountNotification(accountNotification);

                        // Serialize the stored notification as JSON string
                        broadcastMessage(session, storedNotification.toMap());
                        return new ObjectMapper().writeValueAsString(storedNotification.toMap());
                    } catch (IOException e) {
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
