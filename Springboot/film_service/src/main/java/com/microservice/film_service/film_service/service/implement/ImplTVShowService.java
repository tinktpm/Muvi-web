package com.microservice.film_service.film_service.service.implement;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.microservice.film_service.film_service.model.ComingSoonProperty;
import com.microservice.film_service.film_service.model.Genre;
import com.microservice.film_service.film_service.model.Status;
import com.microservice.film_service.film_service.model.TVShow;
import com.microservice.film_service.film_service.repository.PagingAndSortingTVShowRepository;
import com.microservice.film_service.film_service.repository.TVShowRepository;
import com.microservice.film_service.film_service.service.TVShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ImplTVShowService implements TVShowService {
    @Value("${CLOUDINARY_URL}")
    private String cloudinary_url;

    @Autowired
    private TVShowRepository tvShowRepository;
    
    @Autowired
    private PagingAndSortingTVShowRepository pagingAndSortingTVShowRepository;
    
    @Override
    public TVShow getTVShow(String id){
        return tvShowRepository.findById(id).orElse(null);
    }

    @Override
    public List<TVShow> getTVShowByStatus(Status status, int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "firstYearRelease");
        return pagingAndSortingTVShowRepository.findByStatus(pageable, status).getContent();
    }

    @Override
    public List<TVShow> getTVShows(int page, int size, List<Genre> genres, String name, List<String> countries,
                                   List<Integer> ratings, List<Integer> years) {
        Pageable paging = PageRequest.of(page, size, Sort.Direction.DESC, "firstYearRelease");
        if(years == null){
            years = new ArrayList<>();
            for(int i = 1900; i <= LocalDateTime.now().getYear(); i++){
                years.add(i);
            }
        }
        if(years.isEmpty()){
            years = new ArrayList<>();
            for(int i = 1900; i <= LocalDateTime.now().getYear(); i++){
                years.add(i);
            }
        }
        if(genres == null){
            genres = new ArrayList<>();
            genres.addAll(Arrays.asList(Genre.values()));
        }
        if(genres.isEmpty()){
            genres = new ArrayList<>();
            genres.addAll(Arrays.asList(Genre.values()));
        }
        if(countries == null){
            countries = Arrays.asList("Afghanistan",
                    "Albania",
                    "Algeria",
                    "Andorra",
                    "Angola",
                    "Antigua and Barbuda",
                    "Argentina",
                    "Armenia",
                    "Australia",
                    "Austria",
                    "Azerbaijan",
                    "The Bahamas",
                    "Bahrain",
                    "Bangladesh",
                    "Barbados",
                    "Belarus",
                    "Belgium",
                    "Belize",
                    "Benin",
                    "Bhutan",
                    "Bolivia",
                    "Bosnia and Herzegovina",
                    "Botswana",
                    "Brazil",
                    "Brunei",
                    "Bulgaria",
                    "Burkina Faso",
                    "Burundi",
                    "Cabo Verde",
                    "Cambodia",
                    "Cameroon",
                    "Canada",
                    "Central African Republic",
                    "Chad",
                    "Chile",
                    "China",
                    "Colombia",
                    "Comoros",
                    "Congo, Democratic Republic of the",
                    "Congo, Republic of the",
                    "Costa Rica",
                    "Côte d’Ivoire",
                    "Croatia",
                    "Cuba",
                    "Cyprus",
                    "Czech Republic",
                    "Denmark",
                    "Djibouti",
                    "Dominica",
                    "Dominican Republic",
                    "East Timor (Timor-Leste)",
                    "Ecuador",
                    "Egypt",
                    "El Salvador",
                    "Equatorial Guinea",
                    "Eritrea",
                    "Estonia",
                    "Eswatini",
                    "Ethiopia",
                    "Fiji",
                    "Finland",
                    "France",
                    "Gabon",
                    "The Gambia",
                    "Georgia",
                    "Germany",
                    "Ghana",
                    "Greece",
                    "Grenada",
                    "Guatemala",
                    "Guinea",
                    "Guinea-Bissau",
                    "Guyana",
                    "Haiti",
                    "Honduras",
                    "Hungary",
                    "Iceland",
                    "India",
                    "Indonesia",
                    "Iran",
                    "Iraq",
                    "Ireland",
                    "Israel",
                    "Italy",
                    "Jamaica",
                    "Japan",
                    "Jordan",
                    "Kazakhstan",
                    "Kenya",
                    "Kiribati",
                    "Korea, North",
                    "Korea, South",
                    "Kosovo",
                    "Kuwait",
                    "Kyrgyzstan",
                    "Laos",
                    "Latvia",
                    "Lebanon",
                    "Lesotho",
                    "Liberia",
                    "Libya",
                    "Liechtenstein",
                    "Lithuania",
                    "Luxembourg",
                    "Madagascar",
                    "Malawi",
                    "Malaysia",
                    "Maldives",
                    "Mali",
                    "Malta",
                    "Marshall Islands",
                    "Mauritania",
                    "Mauritius",
                    "Mexico",
                    "Micronesia, Federated States of",
                    "Moldova",
                    "Monaco",
                    "Mongolia",
                    "Montenegro",
                    "Morocco",
                    "Mozambique",
                    "Myanmar (Burma)",
                    "Namibia",
                    "Nauru",
                    "Nepal",
                    "Netherlands",
                    "New Zealand",
                    "Nicaragua",
                    "Niger",
                    "Nigeria",
                    "North Macedonia",
                    "Norway",
                    "Oman",
                    "Pakistan",
                    "Palau",
                    "Panama",
                    "Papua New Guinea",
                    "Paraguay",
                    "Peru",
                    "Philippines",
                    "Poland",
                    "Portugal",
                    "Qatar",
                    "Romania",
                    "Russia",
                    "Rwanda",
                    "Saint Kitts and Nevis",
                    "Saint Lucia",
                    "Saint Vincent and the Grenadines",
                    "Samoa",
                    "San Marino",
                    "Sao Tome and Principe",
                    "Saudi Arabia",
                    "Senegal",
                    "Serbia",
                    "Seychelles",
                    "Sierra Leone",
                    "Singapore",
                    "Slovakia",
                    "Slovenia",
                    "Solomon Islands",
                    "Somalia",
                    "South Africa",
                    "Spain",
                    "Sri Lanka",
                    "Sudan",
                    "Sudan, South",
                    "Suriname",
                    "Sweden",
                    "Switzerland",
                    "Syria",
                    "Taiwan",
                    "Tajikistan",
                    "Tanzania",
                    "Thailand",
                    "Togo",
                    "Tonga",
                    "Trinidad and Tobago",
                    "Tunisia",
                    "Turkey",
                    "Turkmenistan",
                    "Tuvalu",
                    "Uganda",
                    "Ukraine",
                    "United Arab Emirates",
                    "United Kingdom",
                    "United States",
                    "Uruguay",
                    "Uzbekistan",
                    "Vanuatu",
                    "Vatican City",
                    "Venezuela",
                    "Vietnam",
                    "Yemen",
                    "Zambia",
                    "Zimbabwe");
        }
        if(countries.isEmpty()){
            countries = Arrays.asList("Afghanistan",
                    "Albania",
                    "Algeria",
                    "Andorra",
                    "Angola",
                    "Antigua and Barbuda",
                    "Argentina",
                    "Armenia",
                    "Australia",
                    "Austria",
                    "Azerbaijan",
                    "The Bahamas",
                    "Bahrain",
                    "Bangladesh",
                    "Barbados",
                    "Belarus",
                    "Belgium",
                    "Belize",
                    "Benin",
                    "Bhutan",
                    "Bolivia",
                    "Bosnia and Herzegovina",
                    "Botswana",
                    "Brazil",
                    "Brunei",
                    "Bulgaria",
                    "Burkina Faso",
                    "Burundi",
                    "Cabo Verde",
                    "Cambodia",
                    "Cameroon",
                    "Canada",
                    "Central African Republic",
                    "Chad",
                    "Chile",
                    "China",
                    "Colombia",
                    "Comoros",
                    "Congo, Democratic Republic of the",
                    "Congo, Republic of the",
                    "Costa Rica",
                    "Côte d’Ivoire",
                    "Croatia",
                    "Cuba",
                    "Cyprus",
                    "Czech Republic",
                    "Denmark",
                    "Djibouti",
                    "Dominica",
                    "Dominican Republic",
                    "East Timor (Timor-Leste)",
                    "Ecuador",
                    "Egypt",
                    "El Salvador",
                    "Equatorial Guinea",
                    "Eritrea",
                    "Estonia",
                    "Eswatini",
                    "Ethiopia",
                    "Fiji",
                    "Finland",
                    "France",
                    "Gabon",
                    "The Gambia",
                    "Georgia",
                    "Germany",
                    "Ghana",
                    "Greece",
                    "Grenada",
                    "Guatemala",
                    "Guinea",
                    "Guinea-Bissau",
                    "Guyana",
                    "Haiti",
                    "Honduras",
                    "Hungary",
                    "Iceland",
                    "India",
                    "Indonesia",
                    "Iran",
                    "Iraq",
                    "Ireland",
                    "Israel",
                    "Italy",
                    "Jamaica",
                    "Japan",
                    "Jordan",
                    "Kazakhstan",
                    "Kenya",
                    "Kiribati",
                    "Korea, North",
                    "Korea, South",
                    "Kosovo",
                    "Kuwait",
                    "Kyrgyzstan",
                    "Laos",
                    "Latvia",
                    "Lebanon",
                    "Lesotho",
                    "Liberia",
                    "Libya",
                    "Liechtenstein",
                    "Lithuania",
                    "Luxembourg",
                    "Madagascar",
                    "Malawi",
                    "Malaysia",
                    "Maldives",
                    "Mali",
                    "Malta",
                    "Marshall Islands",
                    "Mauritania",
                    "Mauritius",
                    "Mexico",
                    "Micronesia, Federated States of",
                    "Moldova",
                    "Monaco",
                    "Mongolia",
                    "Montenegro",
                    "Morocco",
                    "Mozambique",
                    "Myanmar (Burma)",
                    "Namibia",
                    "Nauru",
                    "Nepal",
                    "Netherlands",
                    "New Zealand",
                    "Nicaragua",
                    "Niger",
                    "Nigeria",
                    "North Macedonia",
                    "Norway",
                    "Oman",
                    "Pakistan",
                    "Palau",
                    "Panama",
                    "Papua New Guinea",
                    "Paraguay",
                    "Peru",
                    "Philippines",
                    "Poland",
                    "Portugal",
                    "Qatar",
                    "Romania",
                    "Russia",
                    "Rwanda",
                    "Saint Kitts and Nevis",
                    "Saint Lucia",
                    "Saint Vincent and the Grenadines",
                    "Samoa",
                    "San Marino",
                    "Sao Tome and Principe",
                    "Saudi Arabia",
                    "Senegal",
                    "Serbia",
                    "Seychelles",
                    "Sierra Leone",
                    "Singapore",
                    "Slovakia",
                    "Slovenia",
                    "Solomon Islands",
                    "Somalia",
                    "South Africa",
                    "Spain",
                    "Sri Lanka",
                    "Sudan",
                    "Sudan, South",
                    "Suriname",
                    "Sweden",
                    "Switzerland",
                    "Syria",
                    "Taiwan",
                    "Tajikistan",
                    "Tanzania",
                    "Thailand",
                    "Togo",
                    "Tonga",
                    "Trinidad and Tobago",
                    "Tunisia",
                    "Turkey",
                    "Turkmenistan",
                    "Tuvalu",
                    "Uganda",
                    "Ukraine",
                    "United Arab Emirates",
                    "United Kingdom",
                    "United States",
                    "Uruguay",
                    "Uzbekistan",
                    "Vanuatu",
                    "Vatican City",
                    "Venezuela",
                    "Vietnam",
                    "Yemen",
                    "Zambia",
                    "Zimbabwe");
        }
        Page<TVShow> filmPage = pagingAndSortingTVShowRepository.findByGenresInAndNameRegexIgnoreCaseAndCountryOfOriginInAndFirstYearReleaseIn(
                paging, genres, ".*" + name + ".*",countries, years);
        return filmPage.getContent();
    }

    @Override
    public TVShow addTVShow(MultipartFile banner, TVShow tvShow) throws Exception {
        Cloudinary cloudinary = new Cloudinary(cloudinary_url);
        cloudinary.config.secure = true;
        try{
            String filmId = UUID.randomUUID().toString();
            String publicId = tvShow.getName()+ "_" + filmId;
            Map<String, String> image = cloudinary.uploader().upload(convertMultiPartToFile(banner), ObjectUtils.asMap(
                    "folder", "SOA/FINAL/images/", "public_id", publicId));

            tvShow.setBanner(image.get("url"));
            return tvShowRepository.insert(tvShow);
        }catch(Exception e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public TVShow editTVShow(MultipartFile banner, TVShow tvShow, boolean isChangeBanner) {
        Cloudinary cloudinary = new Cloudinary(cloudinary_url);
        cloudinary.config.secure = true;
        try{
            String filmId = tvShow.getId();
            String publicId = tvShow.getName()+ "_" + filmId;
            if(isChangeBanner){
                Map<String, String> image = cloudinary.uploader().upload(convertMultiPartToFile(banner), ObjectUtils.asMap(
                        "folder", "SOA/FINAL/images/", "public_id", publicId));

                tvShow.setBanner(image.get("url"));
            }
            return tvShowRepository.save(tvShow);
        }catch(Exception e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public TVShow updateExpectedReleaseDate(String tvShowID, ComingSoonProperty property){
        try {
            TVShow tvShow = getTVShow(tvShowID);
            tvShow.setProperty(property);
            return tvShowRepository.save(tvShow);
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public TVShow updateRate(String tvShowID, double rate) {
        try {
            TVShow tvShow = getTVShow(tvShowID);
            if(tvShow != null){
                tvShow.setRate(rate);
                return tvShowRepository.save(tvShow);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public TVShow deleteTVShow(String tvShowID) {
        try{
            TVShow tvShow = tvShowRepository.findById(tvShowID).orElse(null);
            if(tvShow != null){
                tvShowRepository.delete(tvShow);
                return tvShow;
            }
        } catch(Exception e){
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
