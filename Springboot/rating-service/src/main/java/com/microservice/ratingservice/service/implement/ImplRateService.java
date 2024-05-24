package com.microservice.ratingservice.service.implement;

import com.microservice.ratingservice.model.Rate;
import com.microservice.ratingservice.repository.RateRepository;
import com.microservice.ratingservice.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImplRateService implements RateService {

    @Autowired
    private RateRepository rateRepository;

    @Override
    public Rate getRateByUserAndFilm(String userID, String filmID) {
        return rateRepository.findByUserIDAndFilmID(userID, filmID).orElse(null);
    }

    @Override
    public List<Rate> getRatesByFilmID(String filmID) {
        return rateRepository.findByFilmID(filmID);
    }

    @Override
    public void addRate(Rate rate) {
        try{
            Rate storedRate = rateRepository.findByUserIDAndFilmID(rate.getUserID(), rate.getFilmID()).orElse(null);
            if(storedRate != null){
                storedRate.setScore(rate.getScore());
                rateRepository.save(storedRate);
            }
            else{
                rateRepository.insert(rate);
            }
        } catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void updateRate(Rate rate) {
        try{
            Rate storedRate = rateRepository.findByUserIDAndFilmID(rate.getUserID(), rate.getFilmID()).orElse(null);
            if(storedRate != null){
                storedRate.setScore(rate.getScore());
                rateRepository.save(storedRate);
            }
            else{
                rateRepository.insert(rate);
            }
        } catch(Exception e){
            e.printStackTrace();
        }
    }
}
