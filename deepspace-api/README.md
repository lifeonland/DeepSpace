# Deep Space Explorer - Spring Boot REST API

## Project Overview

This is a complete refactor of the Deep Space Explorer application from a legacy Java web application into a modern **Spring Boot 3** REST API with clean architecture, PostgreSQL database, and comprehensive documentation.

## Architecture

### Layer Structure

```
deepspace-api/
├── controller/          # REST Controllers (HTTP endpoints)
├── service/            # Business Logic (Service layer)
├── repository/         # Data Access Layer (JPA Repositories)
├── entity/            # Domain Models (JPA Entities)
├── dto/               # Data Transfer Objects
├── exception/         # Custom Exceptions & Global Error Handling
├── config/            # Spring Configuration
└── util/              # Utility classes
```

### Design Patterns

- **Clean Architecture**: Separation of concerns across layers
- **Dependency Injection**: Spring dependency injection
- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: API-level data transfer
- **Exception Handling**: Global exception handler
- **Logging**: SLF4J with Lombok

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **PostgreSQL 14+**
- **Flyway** (Database Migrations)
- **Lombok** (Boilerplate reduction)
- **OpenAPI 3.0** (API Documentation)
- **Maven**

## Database Setup

### Prerequisites
```bash
# Install PostgreSQL
brew install postgresql (macOS)
# or
sudo apt-get install postgresql (Linux)
```

### Initialize Database
```sql
-- Create database and user
CREATE DATABASE deepspace_db;
CREATE USER deepspace_user WITH ENCRYPTED PASSWORD 'deepspace_password';
ALTER ROLE deepspace_user SET client_encoding TO 'utf8';
ALTER ROLE deepspace_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE deepspace_user SET default_transaction_deferrable TO on;
ALTER ROLE deepspace_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE deepspace_db TO deepspace_user;
```

### Start PostgreSQL
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Manual
postgres -D /usr/local/var/postgres
```

## Running the Application

### Build
```bash
cd deepspace-api
mvn clean install
```

### Run
```bash
# Using Maven
mvn spring-boot:run

# Or directly
java -jar target/deepspace-api-2.0.0.jar
```

### Access Points
- **API Base URL**: http://localhost:8080/api
- **API Docs (Swagger UI)**: http://localhost:8080/api/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/api/v3/api-docs

## API Endpoints

### Planets API

```
GET    /api/v1/planets                    - Get all planets
GET    /api/v1/planets/{id}              - Get planet by ID
GET    /api/v1/planets/name/{name}       - Get planet by name
GET    /api/v1/planets/type/{type}       - Get planets by type
GET    /api/v1/planets/habitable         - Get habitable planets
GET    /api/v1/planets/distance/ordered  - Get planets by distance
GET    /api/v1/planets/search?q=term     - Search planets
POST   /api/v1/planets                   - Create planet
PUT    /api/v1/planets/{id}              - Update planet
DELETE /api/v1/planets/{id}              - Delete planet
```

### Simulations API

```
GET    /api/v1/simulations               - Get all simulations
GET    /api/v1/simulations/{id}          - Get simulation by ID
GET    /api/v1/simulations/status/{status} - Get by status
GET    /api/v1/simulations/planet/{planetId} - Get by planet
POST   /api/v1/simulations               - Create simulation
PUT    /api/v1/simulations/{id}          - Update simulation
POST   /api/v1/simulations/{id}/start    - Start simulation
POST   /api/v1/simulations/{id}/pause    - Pause simulation
POST   /api/v1/simulations/{id}/complete - Complete simulation
DELETE /api/v1/simulations/{id}          - Delete simulation
```

### Quizzes API (Future Ready)

```
GET    /api/v1/quizzes                   - Get all quizzes
GET    /api/v1/quizzes/{id}              - Get quiz by ID
GET    /api/v1/quizzes/published         - Get published quizzes
GET    /api/v1/quizzes/difficulty/{level} - Get by difficulty
POST   /api/v1/quizzes                   - Create quiz
PUT    /api/v1/quizzes/{id}              - Update quiz
DELETE /api/v1/quizzes/{id}              - Delete quiz
```

## Example Requests

### Create a Planet
```bash
curl -X POST http://localhost:8080/api/v1/planets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Proxima Centauri b",
    "type": "exoplanet",
    "size": 12000,
    "distanceFromSun": 40208000000000,
    "surfaceTemperature": -40,
    "gravity": 9.2,
    "description": "Potential exoplanet",
    "isHabitable": true,
    "colorHex": "#4169e1"
  }'
```

### Get All Planets
```bash
curl http://localhost:8080/api/v1/planets
```

### Create Simulation
```bash
curl -X POST http://localhost:8080/api/v1/simulations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mars Orbital Simulation",
    "description": "Simulate Mars orbit",
    "simulationType": "ORBITAL",
    "planetId": 3,
    "speedMultiplier": 10.0,
    "duration": 3600
  }'
```

## Database Migrations

Migrations are automatically applied on startup using Flyway.

### Create New Migration
1. Create file: `src/main/resources/db/migration/V{n}__Description.sql`
2. Follow naming convention: `V{number}__{description}.sql`
3. Restart application

### Migration Files
- `V1__Create_planets_table.sql` - Planets schema
- `V2__Create_simulations_table.sql` - Simulations schema
- `V3__Create_quizzes_table.sql` - Quizzes schema (future)
- `V4__Insert_sample_planets.sql` - Sample data

## Exception Handling

Global exception handler in `exception/GlobalExceptionHandler.java`:

- **ResourceNotFoundException**: Returns 404
- **IllegalArgumentException**: Returns 400
- **Generic Exception**: Returns 500

All errors return JSON format:
```json
{
  "message": "Resource not found",
  "status": 404,
  "timestamp": "2024-01-15T10:30:00"
}
```

## Logging

Configured in `application.yml`:

```yaml
logging:
  level:
    com.deepspace: DEBUG
    org.springframework.web: INFO
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n"
```

All controllers and services use `@Slf4j` for logging.

## Testing

### Run Tests
```bash
mvn test
```

### Sample Test Structure
```java
@SpringBootTest
class PlanetServiceTest {
    
    @Test
    void testGetAllPlanets() {
        // Test implementation
    }
}
```

## Environment Configuration

### application.yml Properties
```yaml
spring.datasource.url=jdbc:postgresql://localhost:5432/deepspace_db
spring.datasource.username=deepspace_user
spring.datasource.password=deepspace_password
spring.jpa.hibernate.ddl-auto=validate
server.port=8080
```

### Environment Variables
```bash
export DATABASE_URL=jdbc:postgresql://localhost:5432/deepspace_db
export DATABASE_USER=deepspace_user
export DATABASE_PASSWORD=deepspace_password
export SERVER_PORT=8080
```

## Development Workflow

### Adding New Entity
1. Create entity in `entity/` with `@Entity`, `@Data`, `@Builder`
2. Create repository in `repository/` extending `JpaRepository`
3. Create DTO in `dto/`
4. Create service in `service/`
5. Create controller in `controller/`
6. Create database migration in `db/migration/`

### Example: Adding Asteroid Entity

1. **Entity**: `entity/Asteroid.java`
2. **Repository**: `repository/AsteroidRepository.java`
3. **DTO**: `dto/AsteroidDTO.java`
4. **Service**: `service/AsteroidService.java`
5. **Controller**: `controller/AsteroidController.java`
6. **Migration**: `V5__Create_asteroids_table.sql`

## Performance Optimization

- **Indexed queries** on frequently searched fields
- **Lazy loading** with JPA relationships
- **Connection pooling** with HikariCP
- **Query optimization** with JPQL and native queries

## Security Considerations (Future)

- Add Spring Security for authentication
- Implement JWT tokens
- Add CORS configuration
- Add rate limiting
- Validate and sanitize inputs

## Monitoring & Metrics

Actuator endpoints available at `/api/actuator/`:
- `/health` - Application health
- `/metrics` - Metrics
- `/info` - Application info

## Future Enhancements

- [ ] Quiz API implementation
- [ ] Authentication & Authorization
- [ ] WebSocket for real-time simulations
- [ ] Advanced search filters
- [ ] Data export (CSV, PDF)
- [ ] Caching layer (Redis)
- [ ] API rate limiting
- [ ] Pagination and sorting
- [ ] File uploads for planet images
- [ ] User profiles and saved simulations

## Docker Deployment

### Dockerfile
```dockerfile
FROM eclipse-temurin:17-jdk-jammy
COPY target/deepspace-api-2.0.0.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Build & Run
```bash
docker build -t deepspace-api:latest .
docker run -p 8080:8080 -e DATABASE_URL=jdbc:postgresql://db:5432/deepspace_db deepspace-api:latest
```

## Troubleshooting

### Database Connection Issues
```bash
# Test PostgreSQL connection
psql -U deepspace_user -d deepspace_db -h localhost -p 5432
```

### Port Already in Use
```bash
# Change port in application.yml
server.port=8081
```

### Migration Failures
```bash
# Check Flyway history
SELECT * FROM flyway_schema_history;

# Reset migrations (development only)
DROP TABLE flyway_schema_history;
```

## Contributing

1. Create feature branch
2. Follow package structure
3. Add logging to services
4. Add unit tests
5. Update documentation
6. Submit PR

## License

MIT License - See LICENSE file

## Contact & Support

For issues or questions, please open a GitHub issue or contact the development team.

---

**Last Updated**: 2024-04-25
**Version**: 2.0.0
