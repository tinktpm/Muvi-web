// package com.microservice.demo.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
// import org.springframework.security.web.SecurityFilterChain;

// import static org.springframework.security.config.Customizer.withDefaults;

// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true)
// public class SecurityConfig {
//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//         httpSecurity.authorizeHttpRequests((authorize) -> authorize.requestMatchers("/admin/**")
//                         .authenticated()
//                         .anyRequest()
//                         .permitAll())
//                 .formLogin(withDefaults());
//         return httpSecurity.build();
//     }

//     @Bean
//     public WebSecurityCustomizer ignoringCustomizer() {
//         return (web) -> web.ignoring().requestMatchers("/eureka/web");
//     }
// }
