package com.microservice.viewservice;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@OpenAPIDefinition(
		info = @Info(contact = @Contact(name = "Nguyen Huu Tin",
				email = "nguyenhuutin124@gmail.com"), title = "Rating Service",
				description = "Rating service provide the department information to the other users.",
				license = @License(name = "Rating service licence", url = "www.google.com/licence"),
				version = "v1"))
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class ViewServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ViewServiceApplication.class, args);
	}

}
