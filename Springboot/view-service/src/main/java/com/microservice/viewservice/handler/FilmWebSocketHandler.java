package com.microservice.viewservice.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.microservice.viewservice.model.CustomPayload;
import com.microservice.viewservice.model.HistoryFilm;
import com.microservice.viewservice.service.implement.ImplHistoryFilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class FilmWebSocketHandler implements WebSocketHandler {
    @Autowired
    private ImplHistoryFilmService listHistoryVideoService;

    @Override
    public Mono<Void> handle(WebSocketSession session) {

        Flux<WebSocketMessage> flux = session.receive()
                .handle((webSocketMessage, synchronousSink) -> {
                    try {
                        CustomPayload payload = new ObjectMapper()
                                .readValue(
                                        webSocketMessage.getPayload().asInputStream().readAllBytes(),
                                        CustomPayload.class
                                );
                        synchronousSink.next(payload);

                        HistoryFilm film = new HistoryFilm(payload.getUserID(), payload.getFilmID(), payload.getDuration(), LocalDateTime.now());
                        listHistoryVideoService.addIntoListHistoryVideo(film);
                    } catch (IOException e) {
                        synchronousSink.error(e);
                    }
                })
                .map(msg -> session.textMessage("Echo: " + msg));
        return session.send(flux);
    }
}
