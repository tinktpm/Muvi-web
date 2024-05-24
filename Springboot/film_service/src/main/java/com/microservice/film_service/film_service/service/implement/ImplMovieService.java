package com.microservice.film_service.film_service.service.implement;

import com.cloudinary.Cloudinary;
import com.cloudinary.EagerTransformation;
import com.cloudinary.utils.ObjectUtils;
import com.microservice.film_service.film_service.model.ComingSoonProperty;
import com.microservice.film_service.film_service.model.Movie;
import com.microservice.film_service.film_service.model.Genre;
import com.microservice.film_service.film_service.model.Status;
import com.microservice.film_service.film_service.repository.ComingSoonPropertyRepository;
import com.microservice.film_service.film_service.repository.MovieRepository;
import com.microservice.film_service.film_service.repository.PagingAndSortingMovieRepository;
import com.microservice.film_service.film_service.service.MovieService;
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
public class ImplMovieService implements MovieService {
    @Value("${CLOUDINARY_URL}")
    private String cloudinary_url;
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private PagingAndSortingMovieRepository pagingAndSortingRepository;

    @Autowired
    private ComingSoonPropertyRepository comingSoonPropertyRepository;

    @Override
    public Movie getFilm(String id){
        return movieRepository.findById(id).orElse(null);
    }

    @Override
    public List<Movie> getFilmByStatus(Status status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "firstYearRelease");
        return pagingAndSortingRepository.findByStatus(pageable, status).getContent();
    }

    @Override
    public List<Movie> getFilms(int page, int size, List<Genre> genres, String name, List<String> countries,
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
        Page<Movie> filmPage = pagingAndSortingRepository.findByGenresInAndNameRegexIgnoreCaseAndCountryOfOriginInAndFirstYearReleaseIn(
                paging, genres, ".*" + name + ".*", countries, years);
        return filmPage.getContent();
    }

    @Override
    public Movie addFilm(MultipartFile video, MultipartFile banner, Movie film) throws IOException {
        Cloudinary cloudinary = new Cloudinary(cloudinary_url);
        cloudinary.config.secure = true;
        try {
            String filmId = UUID.randomUUID().toString();
            String publicId = film.getName()+ "_" + filmId;
            Map<String, String> image = cloudinary.uploader().upload(convertMultiPartToFile(banner), ObjectUtils.asMap(
                    "folder", "SOA/FINAL/images/", "public_id", publicId));
            if(!film.getStatus().name().equals("COMING_SOON")){
                Map<String, String> json = cloudinary.uploader().upload(convertMultiPartToFile(video),
                        ObjectUtils.asMap("resource_type", "video",
                                "folder", "SOA/FINAL/videos/",
                                "public_id", publicId,
                                "eager", Arrays.asList(
                                        new EagerTransformation().width(1000).height(1000).crop("pad").audioCodec("none"),
                                        new EagerTransformation().width(1600).height(1000).crop("crop").gravity("south").audioCodec("none")),
                                "eager_async", true,
                                "eager_notification_url", "http://localhost:8080/api/v1/film"));
                System.out.println("Url: " + json.get("url"));
                film.setVideo(json.get("url"));
            }
            else{
                ComingSoonProperty property = comingSoonPropertyRepository.insert(film.getProperty());
                film.setProperty(property);
            }
            System.out.println("Url image: " + image.get("url"));
            film.setBanner(image.get("url"));
            return movieRepository.insert(film);
        }
        catch(Exception e){
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

    @Override
    public Movie editFilm(MultipartFile video, MultipartFile banner, Movie film, boolean isChangeVideo, boolean isChangeBanner) {
        Cloudinary cloudinary = new Cloudinary(cloudinary_url);
        cloudinary.config.secure = true;
        try {
            String filmId = film.getId();
            String publicId = film.getName()+ "_" + filmId;
            if(isChangeVideo && !film.getStatus().name().equals("COMING_SOON")){
                Map<String, String> videoMap = cloudinary.uploader().upload(convertMultiPartToFile(video),
                        ObjectUtils.asMap("resource_type", "video",
                                "folder", "SOA/FINAL/videos/",
                                "public_id", publicId,
                                "eager", Arrays.asList(
                                        new EagerTransformation().width(1000).height(1000).crop("pad").audioCodec("none"),
                                        new EagerTransformation().width(1600).height(1000).crop("crop").gravity("south").audioCodec("none")),
                                "eager_async", true,
                                "eager_notification_url", "http://localhost:8080/api/v1/film"));
                System.out.println("Url: " + videoMap.get("url"));
                film.setVideo(videoMap.get("url"));
            }
            if(isChangeBanner){
                Map<String, String> image = cloudinary.uploader().upload(convertMultiPartToFile(banner), ObjectUtils.asMap(
                        "folder", "SOA/FINAL/images/", "public_id", publicId));
                System.out.println("Url image: " + image.get("url"));
                film.setBanner(image.get("url"));
            }
            Movie movie = getFilm(film.getId());
            ComingSoonProperty property = movie.getProperty();
            System.out.print(property);
            if(movie.getProperty() == null){
                property = new ComingSoonProperty(film.getProperty().getExpectedReleaseDate());

                property = comingSoonPropertyRepository.insert(property);
                film.setProperty(property);
            }
            else if(movie.getProperty().getExpectedReleaseDate() != film.getProperty().getExpectedReleaseDate()){
                property.setExpectedReleaseDate(film.getProperty().getExpectedReleaseDate());
                property = comingSoonPropertyRepository.save(property);
                film.setProperty(property);
            }
            film.setProperty(property);
            return movieRepository.save(film);
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Movie updateExpectedReleaseDate(String movieID, ComingSoonProperty property){
        try {
            Movie movie = getFilm(movieID);
            movie.setProperty(property);
            return movieRepository.save(movie);
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Movie updateRate(String movieID, double rate) {
        try{
            Movie movie = getFilm(movieID);
            if(movie != null){
                movie.setRate(rate);
                return movieRepository.save(movie);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Movie deleteFilm(String movieID) {
        try{
            Movie movie = movieRepository.findById(movieID).orElse(null);
            if(movie != null){
                movieRepository.delete(movie);
                return movie;
            }
        } catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
