package com.microservice.viewservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomPayload {
    private String userID;
    private String filmID;
    private double duration;
    private String messageAction;
}
