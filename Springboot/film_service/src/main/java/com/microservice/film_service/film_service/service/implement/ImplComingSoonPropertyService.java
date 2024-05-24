package com.microservice.film_service.film_service.service.implement;

import com.microservice.film_service.film_service.model.ComingSoonProperty;
import com.microservice.film_service.film_service.repository.ComingSoonPropertyRepository;
import com.microservice.film_service.film_service.service.ComingSoonPropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ImplComingSoonPropertyService implements ComingSoonPropertyService {

    @Autowired
    private ComingSoonPropertyRepository repository;

    @Override
    public ComingSoonProperty getProperty(String id){
        try{
            return repository.findById(id).orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ComingSoonProperty addProperty(Date expectedReleaseDate) {
        try {
            return repository.insert(new ComingSoonProperty(expectedReleaseDate));
        } catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ComingSoonProperty updateProperty(String id, String email, String userID){
        try {
            ComingSoonProperty comingSoonProperty = getProperty(id);
            if(comingSoonProperty != null){
                if(comingSoonProperty.getRegisteredEmails().contains(email)){
                    comingSoonProperty.getRegisteredEmails().remove(email);
                    comingSoonProperty.getRegisterUserIds().remove(userID);
                }
                else{
                    comingSoonProperty.getRegisteredEmails().add(email);
                    comingSoonProperty.getRegisterUserIds().add(userID);
                }
                return repository.save(comingSoonProperty);
            }
        } catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
