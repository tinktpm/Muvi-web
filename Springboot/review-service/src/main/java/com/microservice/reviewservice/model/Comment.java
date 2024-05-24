package com.microservice.reviewservice.model;

import com.microservice.reviewservice.service.CommentService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Document("comment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    private String id;

    private User user;
    private String filmID;
    private String content;
    private LocalDateTime time;
    private String replyCommentID;

    @DocumentReference
    private List<Comment> repliedComments = new ArrayList<>();

    public Comment(User user, String filmID, String content, LocalDateTime time){
        this.user = user;
        this.filmID = filmID;
        this.content = content;
        this.time = time;
    }

    public Comment(User user, String filmID, String content, LocalDateTime time, String replyComment){
        this.user = user;
        this.filmID = filmID;
        this.content = content;
        this.time = time;
        this.replyCommentID = replyComment;
    }

    public Map<String, Object> toMap(){
        Map<String, Object> map = new HashMap<>();
        map.put("id", this.id);
        map.put("user", this.user.toMap());
        map.put("filmID", this.filmID);
        map.put("content", this.content);
        Date date = Date.from(this.time.atZone(ZoneId.systemDefault()).toInstant());
        map.put("time", date);
        map.put("replyCommentID", this.replyCommentID);
        List<Map<String, Object>> repliedCommentMap = new ArrayList<>();
        for(Comment comment: this.repliedComments){
            repliedCommentMap.add(comment.toMap());
        }
        map.put("repliedComments", repliedCommentMap);
        return map;
    }
}
