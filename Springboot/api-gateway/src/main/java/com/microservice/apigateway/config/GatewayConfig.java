package com.microservice.apigateway.config;

import com.microservice.apigateway.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

@Configuration
public class GatewayConfig {

    @Autowired
    private JwtAuthenticationFilter filter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
//                .route("auth", r -> r.path("/auth/**").filters(f -> f.filter(filter)).uri("lb://auth"))
//                Swagger url
                .route("film-swagger", r -> r.path("/api/v1/film-swagger/**").uri("lb://film-service"))
                .route("notification-swagger", r -> r.path("/api/v1/notification-swagger/**").uri("lb://notification-service"))
                .route("payment-swagger", r -> r.path("/api/v1/payment-swagger/**").uri("lb://payment-service"))
                .route("rating-swagger", r -> r.path("/api/v1/rating-swagger/**").uri("lb://rating-service"))
                .route("review-swagger", r -> r.path("/api/v1/review-swagger/**").uri("lb://review-service"))
                .route("view-swagger", r -> r.path("/api/v1/view-swagger/**").uri("lb://view-service"))
                .route("user-swagger", r -> r.path("/api/v1/user-swagger/**").uri("lb://user-service"))
                .route("auth-swagger", r -> r.path("/api/v1/auth-swagger/**").uri("lb://auth-service"))
                .route("recommendation-swagger", r -> r.path("/api/v1/recommendation-swagger/**").uri("lb://recommendation-service"))
//                Url for backend
                .route("film-service", r -> r.path("/api/v1/film/**").uri("lb://film-service"))
                .route("movie-service", r -> r.path("/api/v1/movie/**").uri("lb://film-service"))
                .route("tv-show-service", r -> r.path("/api/v1/tv_show/**").uri("lb://film-service"))
                .route("season-service", r -> r.path("/api/v1/season/**").uri("lb://film-service"))
                .route("episode-service", r -> r.path("/api/v1/episode/**").uri("lb://film-service"))
                .route("watchlist-service", r -> r.path("/api/v1/watchlist/**").filters(f -> f.filter(filter)).uri("lb://film-service"))
                .route("coming-soon-service", r -> r.path("/api/v1/property/**").filters(f -> f.filter(filter)).uri("lb://film-service"))
                .route("view-service", r -> r.path("/api/v1/list_history_film/**").filters(f -> f.filter(filter)).uri("lb://view-service"))
                .route("websocket-view-service", r -> r.path("/api/v1/update_history_film/**").uri("lb://view-service"))
                .route("rate-service", r -> r.path("/api/v1/rate/**").filters(f -> f.filter(filter)).uri("lb://rating-service"))
                .route("comment-service", r -> r.path("/api/v1/websocket-comment/**").uri("lb://review-service"))
                .route("comments-service", r -> r.path("/api/v1/comments/**").filters(f -> f.filter(filter)).uri("lb://review-service"))
                .route("notification-service", r -> r.path("/api/v1/notification/**").uri("lb://notification-service"))
                .route("comment-notification-service", r -> r.path("/api/v1/comment-notification/**").uri("lb://notification-service"))
                .route("account-notification-service", r -> r.path("/api/v1/account-notification/**").uri("lb://notification-service"))
                .route("film-notification-service", r -> r.path("/api/v1/film-notification/**").uri("lb://notification-service"))
                .route("email-notification-service", r -> r.path("/api/v1/email/**").filters(f -> f.filter(filter)).uri("lb://notification-service"))
                .route("payment-service", r -> r.path("/api/v1/payment/**").filters(f -> f.filter(filter)).uri("lb://payment-service"))
                .route("user-service", r -> r.path("/api/v1/user/**").filters(f -> f.filter(filter)).uri("lb://user-service"))
                .route("recommendation-service", r -> r.path("/api/v1/recommendation/**").uri("lb://recommendation-service")).build();
    }

}
