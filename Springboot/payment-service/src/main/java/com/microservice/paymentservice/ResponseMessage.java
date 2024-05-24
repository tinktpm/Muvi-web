package com.microservice.paymentservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseMessage {

    public static ResponseEntity<Object> createResponse(HttpStatus status, String message, Object object){
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("message", message);
        response.put("data", object);
        return new ResponseEntity<>(response, status);
    }

}
