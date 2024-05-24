package com.microservice.film_service.film_service.service.implement;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.microservice.film_service.film_service.model.ComingSoonProperty;
import com.microservice.film_service.film_service.model.Season;
import com.microservice.film_service.film_service.repository.ComingSoonPropertyRepository;
import com.microservice.film_service.film_service.repository.SeasonRepository;
import com.microservice.film_service.film_service.repository.TVShowRepository;
import com.microservice.film_service.film_service.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ImplSeasonService implements SeasonService {
    @Value("${CLOUDINARY_URL}")
    private String cloudinary_url;
    @Autowired
    private SeasonRepository seasonRepository;

    @Autowired
    private TVShowRepository tvShowRepository;

    @Autowired
    private ComingSoonPropertyRepository comingSoonPropertyRepository;

    @Override
    public Season getSeason(String id) {
        return seasonRepository.findById(id).orElse(null);
    }

    @Override
    public List<Season> getSeasons(String tvShowID) {
        return seasonRepository.findByTvShowID(tvShowID);
    }

    @Override
    public Season addSeason(MultipartFile banner, Season season) throws IOException {
        Cloudinary cloudinary = new Cloudinary(cloudinary_url);
        cloudinary.config.secure = true;
        try{
            String seasonID = UUID.randomUUID().toString();
            String publicID = season.getName() + "_" + seasonID;
            if(season.getStatus().name().equals("COMING_SOON")){
                ComingSoonProperty property = comingSoonPropertyRepository.insert(season.getProperty());
                season.setProperty(property);
            }

            Map<String, String> image = cloudinary.uploader().upload(convertMultiPartToFile(banner), ObjectUtils.asMap(
                    "folder", "SOA/FINAL/images/", "public_id", publicID));

            season.setBanner(image.get("url"));
            return seasonRepository.insert(season);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Season editSeason(MultipartFile banner, Season season, boolean isChangeBanner) throws IOException {
        Cloudinary cloudinary = new Cloudinary(cloudinary_url);
        cloudinary.config.secure = true;
        try{
            String seasonID = season.getId();
            String publicID = season.getName() + "_" + seasonID;

            if(isChangeBanner){
                Map<String, String> image = cloudinary.uploader().upload(convertMultiPartToFile(banner), ObjectUtils.asMap(
                        "folder", "SOA/FINAL/images/", "public_id", publicID));
                season.setBanner(image.get("url"));
            }

            Season film = getSeason(season.getId());
            ComingSoonProperty property = film.getProperty();
            System.out.print(property);
            if(film.getProperty() == null){
                property = new ComingSoonProperty(season.getProperty().getExpectedReleaseDate());

                property = comingSoonPropertyRepository.insert(property);
                season.setProperty(property);
            }
            else if(film.getProperty().getExpectedReleaseDate() != season.getProperty().getExpectedReleaseDate()){
                property.setExpectedReleaseDate(season.getProperty().getExpectedReleaseDate());
                property = comingSoonPropertyRepository.save(property);
                season.setProperty(property);
            }
            return seasonRepository.save(season);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Season deleteSeason(String id){
        try{
            Season season = seasonRepository.findById(id).orElse(null);
            if(season != null){
                seasonRepository.delete(season);
                return season;
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
