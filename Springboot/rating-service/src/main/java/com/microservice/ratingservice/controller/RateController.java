package com.microservice.ratingservice.controller;

import com.microservice.ratingservice.ResponseMessage;
import com.microservice.ratingservice.client.FilmServiceClient;
import com.microservice.ratingservice.model.Rate;
import com.microservice.ratingservice.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/rate")
public class RateController {

    @Autowired
    private RateService rateService;

    @Autowired
    private FilmServiceClient filmServiceClient;

    @GetMapping("/{filmID}")
    public ResponseEntity<Object> getRate(@PathVariable String filmID){
        List<Rate> rates = rateService.getRatesByFilmID(filmID);
        if(rates.isEmpty()){
            return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "DON'T HAVE ANY VOTE FOR THIS FILM", null);
        }
        int count = 0;
        int total = 0;
        for(Rate rate: rates){
            count++;
            total+= rate.getScore();
        }

        Map<String, Object> result = new HashMap<>();
        result.put("count", count);
        result.put("average", (double) total / count);
        return ResponseMessage.createResponse(HttpStatus.OK, "GET RATE SUCCESSFULLY!", result);
    }

    @PostMapping("")
    public ResponseEntity<Object> addRate(@RequestBody Rate rate){
        try{
            rateService.addRate(rate);

            Map<String, Object> updateRate = new HashMap<>();
            updateRate.put("id", rate.getFilmID());
            updateRate.put("rate", rate.getScore());
            try{
                try {
                    filmServiceClient.updateRateMovie(updateRate);
                } catch (Exception e){
                    e.printStackTrace();
                }

                try {
                    filmServiceClient.updateRateTvShow(updateRate);
                } catch (Exception e){
                    e.printStackTrace();
                }
            } catch (Exception e){
                e.printStackTrace();
            }
        } catch(Exception e){
            e.printStackTrace();
        }
        return getRate(rate.getFilmID());
    }
    @PutMapping("")
    public ResponseEntity<Object> updateRate(@RequestBody Rate rate){
        try{
            rateService.updateRate(rate);
        } catch(Exception e){
            e.printStackTrace();
        }
        return getRate(rate.getFilmID());
    }
}
