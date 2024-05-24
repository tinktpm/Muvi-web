FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
COPY target/film_service-0.0.1-SNAPSHOT.jar film_service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","film_service-0.0.1-SNAPSHOT.jar"]