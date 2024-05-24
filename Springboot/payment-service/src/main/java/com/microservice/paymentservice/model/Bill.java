package com.microservice.paymentservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("bill")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bill {
    @Id
    private String id;

    private String userID;
    private LocalDateTime createdAt;
    private double total;

    public Bill(String userID, double total){
        this.userID = userID;
        this.total = total;
    }
}
