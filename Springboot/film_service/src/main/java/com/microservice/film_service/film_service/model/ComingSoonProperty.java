package com.microservice.film_service.film_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document("coming-soon-property")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComingSoonProperty {
    @Id
    private String id;
    private List<String> registeredEmails = new ArrayList<>();
    private List<String> registerUserIds = new ArrayList<>();
    private Date expectedReleaseDate;

    public ComingSoonProperty(Date expectedReleaseDate){
        this.expectedReleaseDate = expectedReleaseDate;
    }
}
