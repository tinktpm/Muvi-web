package com.microservice.film_service.film_service.repository;

import com.microservice.film_service.film_service.model.Movie;
import com.microservice.film_service.film_service.model.Genre;
import com.microservice.film_service.film_service.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PagingAndSortingMovieRepository extends CrudRepository<Movie, String> {
    Page<Movie> findByStatus(Pageable pageable, Status status);
    @Query("{" +
            "'genres': { $in: ?0 }," +
            "'name': { $regex: ?1, $options: 'i' }," +
            "'countryOfOrigin': { $in: ?2 }," +
            "'firstYearRelease': { $in: ?3 }" +
            "}")
    Page<Movie> findByGenresInAndNameRegexIgnoreCaseAndCountryOfOriginInAndFirstYearReleaseIn(
            Pageable pageable, List<Genre> genres, String name, List<String> countries, List<Integer> years);

}
