package com.microservice.reviewservice.controller;

import com.microservice.reviewservice.ResponseMessage;
import com.microservice.reviewservice.model.Comment;
import com.microservice.reviewservice.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("")
    public ResponseEntity<Object> getCommentsByFilmID(@RequestParam String filmID,
                                                      @RequestParam(defaultValue = "0", required = false) int page,
                                                      @RequestParam(defaultValue = "5", required = false) int size){
        try {
            List<Comment> comments = commentService.getComments(filmID, page, size);
            return ResponseMessage.createResponse(HttpStatus.OK, "GET COMMENTS BY FILM SUCCESSFULLY!", comments);
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "GET COMMENTS BY FILM FAILED!", null);
    }
}
