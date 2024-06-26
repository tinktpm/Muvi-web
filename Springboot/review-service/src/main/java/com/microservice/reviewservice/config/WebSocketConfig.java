package com.microservice.reviewservice.config;

import com.microservice.reviewservice.handler.CommentWebSocketHandler;
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
    private CommentWebSocketHandler webSocketHandler;

    @Bean
    public HandlerMapping webSocketHandlerMapping(){
        Map<String, WebSocketHandler> map = new HashMap<>();
        map.put("/api/v1/websocket-comment", webSocketHandler);

        SimpleUrlHandlerMapping handlerMapping = new SimpleUrlHandlerMapping();
        handlerMapping.setOrder(1);
        handlerMapping.setUrlMap(map);
        System.out.print(handlerMapping.getUrlMap());
        return handlerMapping;
    }
}
