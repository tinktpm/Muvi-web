package com.microservice.reviewservice.service;

import com.microservice.reviewservice.model.Comment;

import java.util.Date;
import java.util.List;

public interface CommentService {
    public List<Comment> getComments(String filmID, int page, int size);
    public Comment getCommentByID(String ID);
    public Comment getLatestComment(String userID, String filmID);
    public Comment addComment(Comment comment);
    public Comment updateComment(Comment comment);
    public void deleteComment(String id);
}
