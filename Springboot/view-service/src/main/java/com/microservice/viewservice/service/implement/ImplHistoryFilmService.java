package com.microservice.viewservice.service.implement;

import com.microservice.viewservice.model.HistoryFilm;
import com.microservice.viewservice.repository.HistoryFilmRepository;
import com.microservice.viewservice.service.HistoryFilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ImplHistoryFilmService implements HistoryFilmService {

    @Autowired
    private HistoryFilmRepository historyFilmRepository;

    @Override
    public List<HistoryFilm> getFilmsByUserID(String userID, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "viewedAt");
        return historyFilmRepository.findByUserID(pageable, userID).getContent();
    }

    @Override
    public long countViewByDate(Date startDate, Date endDate) {
        return  historyFilmRepository.countByViewedAtGreaterThanAndViewedAtLessThan(startDate, endDate);
    }

    @Override
    public HistoryFilm getFilmByIDAndUserID(String filmID, String userID){
        return historyFilmRepository.findByUserIDAndFilmID(userID, filmID).orElse(null);
    }

    @Override
    public void addIntoListHistoryVideo(HistoryFilm film) {
        try{
            HistoryFilm historyFilm = historyFilmRepository.findByUserIDAndFilmID(film.getUserID(), film.getFilmID()).orElse(null);

            if(historyFilm != null){
                historyFilm.setDuration(film.getDuration());
                historyFilmRepository.save(historyFilm);
            }
            else{
                historyFilmRepository.save(film);
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
