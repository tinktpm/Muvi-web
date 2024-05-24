package com.microservice.viewservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI myOpenAPI() {
        Server viewServer = new Server();
        String viewURL = "localhost:8082";
        viewServer.setUrl(viewURL);
        viewServer.setDescription("view Service");

        Contact contact = new Contact();
        contact.setEmail("nguyenhuutin124@gmail.com");
        contact.setName("HuuTin");
        contact.setUrl("https://google.com");

        License mitLicense = new License().name("MIT License").url("https://google.com");

        Info info = new Info()
                .title("Tutorial Management API")
                .version("1.0")
                .contact(contact)
                .description("This API exposes endpoints to manage tutorials.").termsOfService("https://google.com")
                .license(mitLicense);

        return new OpenAPI().info(info).servers(List.of(viewServer));
    }
}