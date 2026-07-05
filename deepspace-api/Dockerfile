# Base Java image
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

# Run stage
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/deepspace-api-2.0.0.jar app.jar

# Environment variables with defaults
ENV DB_URL=jdbc:postgresql://postgres:5432/deepspace_db
ENV DB_USERNAME=deepspace_user
ENV DB_PASSWORD=deepspace_password

EXPOSE 8080

# Use a shell script to wait for DB if needed, or rely on docker-compose healthchecks
ENTRYPOINT ["java", "-jar", "app.jar"]
