FROM openjdk:17-jdk-slim
WORKDIR /app

COPY target/application-service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 9093

ENTRYPOINT ["java" , "-jar", "app.jar"]