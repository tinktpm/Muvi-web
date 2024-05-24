package com.microservice.film_service.film_service.repository;

import com.microservice.film_service.film_service.model.Genre;
import com.microservice.film_service.film_service.model.Status;
import com.microservice.film_service.film_service.model.TVShow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PagingAndSortingTVShowRepository extends PagingAndSortingRepository<TVShow, String> {
    Page<TVShow> findAll(Pageable pageable);
    Page<TVShow> findByStatus(Pageable pageable, Status status);
    @Query("{" +
            "'genres': { $in: ?0 }," +
            "'name': { $regex: ?1, $options: 'i' }," +
            "'countryOfOrigin': { $in: ?2 }," +
            "'firstYearRelease': { $in: ?3 }" +
            "}")
    Page<TVShow> findByGenresInAndNameRegexIgnoreCaseAndCountryOfOriginInAndFirstYearReleaseIn(
            Pageable pageable, List<Genre> genres, String name, List<String> countries, List<Integer> years);
}
