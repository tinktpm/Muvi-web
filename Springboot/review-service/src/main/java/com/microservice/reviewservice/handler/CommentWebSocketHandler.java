package com.microservice.reviewservice.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microservice.reviewservice.model.Comment;
import com.microservice.reviewservice.model.CustomPayload;
import com.microservice.reviewservice.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.web.reactive.socket.client.ReactorNettyWebSocketClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CommentWebSocketHandler implements WebSocketHandler {
    private final List<WebSocketSession> sessions = new ArrayList<>();
    private final ReactorNettyWebSocketClient webSocketClient = new ReactorNettyWebSocketClient();
    @Autowired
    private CommentService commentService;

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
                        switch (payload.getAction()){
                            case "add":
                                Comment addedComment = new Comment(payload.getUser(), payload.getFilmID(), payload.getContent(), LocalDateTime.now());
                                commentService.addComment(addedComment);
                                broadcastMessage(session, addedComment.toMap());
                                return addedComment.toMap();
                            case "reply":
                                Comment replyComment = new Comment(payload.getUser(), payload.getFilmID(), payload.getContent(), LocalDateTime.now(), payload.getReplyCommentID());
                                Comment storedComment = commentService.addComment(replyComment);

                                Comment comment = commentService.getCommentByID(payload.getReplyCommentID());
                                comment.getRepliedComments().add(storedComment);
                                commentService.updateComment(comment);

                                Map<String, Object> message = new HashMap<>();
                                message.put("replyCommentID", storedComment.getId());
                                message.put("userID", payload.getRepliedUserID());
                                message.put("content", storedComment.getContent());
                                URI serverUri = new URI("ws://localhost:8080/api/v1/comment-notification");
                                webSocketClient.execute(
                                        serverUri,
                                        session.getHandshakeInfo().getHeaders(),
                                        subSession -> {
                                            try {
                                                return subSession.send(
                                                        Mono.just(subSession.textMessage(new ObjectMapper().writeValueAsString(message)))
                                                ).then(
                                                        subSession.receive()
                                                                .map(WebSocketMessage::getPayloadAsText)
                                                                .doOnNext(receivedMessage -> System.out.println("Received message: " + receivedMessage))
                                                                .then()
                                                ).doOnError(error -> {
                                                    System.out.print("Cannot connect to " + serverUri);
                                                });
                                            } catch (JsonProcessingException e) {
                                                throw new RuntimeException(e);
                                            }
                                        }).subscribe();
                                broadcastMessage(session, storedComment.toMap());
                                return storedComment.toMap();
                            case "edit":
                                Comment editComment = commentService.getCommentByID(payload.getId());
                                if(editComment != null){
                                    editComment.setContent(payload.getContent());
                                    editComment.setTime(LocalDateTime.now());
                                    commentService.updateComment(editComment);
                                    broadcastMessage(session, editComment.toMap());
                                    return editComment.toMap();
                                }
                                return null;
                            case "delete":
                                commentService.deleteComment(payload.getId());
                                return null;
                        }

                    } catch (IOException e) {
                        e.printStackTrace();
                    } catch (URISyntaxException e) {
                        throw new RuntimeException(e);
                    }
                    return null;
                })
                .map(msg -> {
                    try {
//                        session.send()
                        return session.textMessage(new ObjectMapper().writeValueAsString(msg));
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                });
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
