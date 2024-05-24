package com.microservice.notificationservice.config;

import com.microservice.notificationservice.handler.AccountNotificationWebSocketHandler;
import com.microservice.notificationservice.handler.CommentNotificationWebSocketHandler;
import com.microservice.notificationservice.handler.FilmNotificationWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class WebSocketConfig {
    @Autowired
    private CommentNotificationWebSocketHandler commentNotificationWebSocketHandler;

    @Autowired
    private AccountNotificationWebSocketHandler accountNotificationWebSocketHandler;

    @Autowired
    private FilmNotificationWebSocketHandler filmNotificationWebSocketHandler;

    @Bean
    public HandlerMapping webSocketHandlerMapping(){
        Map<String, WebSocketHandler> map = new HashMap<>();
        map.put("/api/v1/comment-notification", commentNotificationWebSocketHandler);
        map.put("/api/v1/account-notification", accountNotificationWebSocketHandler);
        map.put("/api/v1/film-notification", filmNotificationWebSocketHandler);

        SimpleUrlHandlerMapping handlerMapping = new SimpleUrlHandlerMapping();
        handlerMapping.setOrder(1);
        handlerMapping.setUrlMap(map);
        return handlerMapping;
    }
}
