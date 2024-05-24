package com.microservice.viewservice.controller;

import com.microservice.viewservice.ResponseMessage;
import com.microservice.viewservice.model.HistoryFilm;
import com.microservice.viewservice.service.HistoryFilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/list_history_film")
public class ListHistoryFilmController {

    @Autowired
    private HistoryFilmService historyFilmService;

    @GetMapping("")
    public ResponseEntity<Object> getListHistoryVideoByUserID(@RequestParam String userID,
                                                              @RequestParam(defaultValue = "0", required = false) int page,
                                                              @RequestParam(defaultValue = "10", required = false) int size){
        try{
            List<HistoryFilm> films = historyFilmService.getFilmsByUserID(userID, page, size);
            if(!films.isEmpty()){
                return ResponseMessage.createResponse(HttpStatus.OK, "GET LIST OF HISTORY VIDEO SUCCESSFULLY!", films);
            }
            return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "DON'T HAVE ANY VIDEO IN LIST OF HISTORY VIDEO", null);
        }catch(Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "DON'T HAVE ANY VIDEO IN LIST OF HISTORY VIDEO", null);
    }

    @GetMapping("/{filmID}")
    public ResponseEntity<Object> getHistoryVideoByUserIDAndFilmID(@PathVariable String filmID, @RequestParam String userID){
        try {
            HistoryFilm film = historyFilmService.getFilmByIDAndUserID(filmID, userID);
            if(film != null){
                return ResponseMessage.createResponse(HttpStatus.OK, "GET HISTORY VIDEO SUCCESSFULLY!", film);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.NOT_FOUND, "DON'T HAVE ANY VIDEO IN LIST OF HISTORY VIDEO", null);
    }

    @GetMapping("/analysis")
    public ResponseEntity<Object> countViewByPeriodTime(@RequestParam Date startDate, @RequestParam Date endDate){
        try {
            long views = historyFilmService.countViewByDate(startDate, endDate);
            return ResponseMessage.createResponse(HttpStatus.OK, "COUNT VIEW BY A PERIOD TIME SUCCESSFULLY!", views);
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "CAN'T COUNT VIEW BY A PERIOD TIME", null);
    }
}
