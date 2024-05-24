package com.microservice.film_service.film_service;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@OpenAPIDefinition(
		info = @Info(contact = @Contact(name = "Nguyen Huu Tin",
				email = "nguyenhuutin124@gmail.com"), title = "Film Service",
				description = "Film service provide the department information to the other users.",
				license = @License(name = "Film service licence", url = "www.film.com/licence"),
				version = "v1"))
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class FilmServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilmServiceApplication.class, args);
	}

}
