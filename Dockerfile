# Stage 1: Build backend
FROM maven:3.9.1-eclipse-temurin-17 AS build-backend
WORKDIR /app

# Copy only pom.xml first to cache dependencies
COPY ecom-backend/pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY ecom-backend/src ./src

# Build jar
RUN mvn clean package -DskipTests

# Stage 2: Build final image
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy the built jar
COPY --from=build-backend /app/target/ecom-proj-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run Spring Boot app
ENTRYPOINT ["java","-jar","app.jar"]
