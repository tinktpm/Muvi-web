package com.microservice.apigateway;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@OpenAPIDefinition(
		info = @Info(contact = @Contact(name = "Nguyen Huu Tin",
				email = "gov.kumarbharatdwaj@gmail.com"), title = "API Gateway",
				termsOfService = "www.api-gateway.com/terms-and-condition",
				description = "API-Gateway provide the api-gateway information to the other users.",
				license = @License(name = "api gateway licence", url = "www.api-gateway.com/licence"),
				version = "v1"))
@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

}
