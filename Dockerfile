# Stage 1: Build backend
FROM maven:3.9.1-eclipse-temurin-17 AS build-backend
WORKDIR /app
COPY ecom-backend/pom.xml .
COPY ecom-backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime image
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build-backend /app/target/ecom-proj-0.0.1-SNAPSHOT.jar app.jar

# Expose port (Spring Boot default)
EXPOSE 8080

# Pass dynamic PORT from Render
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
