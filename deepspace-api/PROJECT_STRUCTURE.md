# Deep Space Explorer API - Project Structure

## Directory Layout

```
deepspace-api/
│
├── src/main/java/com/deepspace/
│   ├── DeepSpaceApiApplication.java          # Spring Boot main class
│   │
│   ├── controller/
│   │   ├── PlanetController.java             # REST endpoints for planets
│   │   ├── SimulationController.java         # REST endpoints for simulations
│   │   └── QuizController.java               # REST endpoints for quizzes (future)
│   │
│   ├── service/
│   │   ├── PlanetService.java                # Business logic for planets
│   │   ├── SimulationService.java            # Business logic for simulations
│   │   └── QuizService.java                  # Business logic for quizzes (future)
│   │
│   ├── repository/
│   │   ├── PlanetRepository.java             # Database access for planets
│   │   ├── SimulationRepository.java         # Database access for simulations
│   │   └── QuizRepository.java               # Database access for quizzes
│   │
│   ├── entity/
│   │   ├── Planet.java                       # JPA entity - planets table
│   │   ├── Simulation.java                   # JPA entity - simulations table
│   │   └── Quiz.java                         # JPA entity - quizzes table
│   │
│   ├── dto/
│   │   ├── PlanetDTO.java                    # Data transfer object for planets
│   │   ├── SimulationDTO.java                # Data transfer object for simulations
│   │   └── QuizDTO.java                      # Data transfer object for quizzes
│   │
│   ├── exception/
│   │   ├── ResourceNotFoundException.java    # Custom exception
│   │   └── GlobalExceptionHandler.java       # Global error handling
│   │
│   ├── config/
│   │   └── (Configuration classes)           # Spring configuration
│   │
│   └── util/
│       └── (Utility classes)                 # Helper utilities
│
├── src/main/resources/
│   ├── application.yml                       # Spring Boot configuration
│   ├── application-dev.yml                   # Development profile
│   ├── application-prod.yml                  # Production profile
│   │
│   └── db/migration/
│       ├── V1__Create_planets_table.sql      # Planets table schema
│       ├── V2__Create_simulations_table.sql  # Simulations table schema
│       ├── V3__Create_quizzes_table.sql      # Quizzes table schema
│       └── V4__Insert_sample_planets.sql     # Sample data
│
├── src/test/java/com/deepspace/
│   ├── controller/
│   │   ├── PlanetControllerTest.java
│   │   ├── SimulationControllerTest.java
│   │   └── QuizControllerTest.java
│   │
│   ├── service/
│   │   ├── PlanetServiceTest.java
│   │   ├── SimulationServiceTest.java
│   │   └── QuizServiceTest.java
│   │
│   └── repository/
│       ├── PlanetRepositoryTest.java
│       ├── SimulationRepositoryTest.java
│       └── QuizRepositoryTest.java
│
├── pom.xml                                   # Maven configuration
├── README.md                                 # Comprehensive documentation
├── PROJECT_STRUCTURE.md                      # This file
└── .gitignore                                # Git ignore rules
```

## File Descriptions

### Main Application
- **DeepSpaceApiApplication.java**: Entry point for Spring Boot application with OpenAPI configuration

### Controllers (HTTP Layer)
All controllers are in `controller/` package and use:
- `@RestController` - RESTful endpoints
- `@RequestMapping` - Path mapping
- `@Operation` - OpenAPI documentation
- Proper HTTP status codes (200, 201, 204, 404, 500)

### Services (Business Logic)
All services are in `service/` package and use:
- `@Service` - Service annotation
- `@Transactional` - Transaction management
- `@Slf4j` - Logging
- DTO conversion methods
- Exception handling

### Repositories (Data Access)
All repositories in `repository/` package:
- Extend `JpaRepository<Entity, ID>`
- Custom query methods with `@Query`
- Native SQL queries support
- Automatic pagination support

### Entities (Domain Models)
All entities in `entity/` package:
- `@Entity` - JPA mapping
- `@Table` - Table naming
- `@Data` - Lombok (getters, setters, toString)
- `@Builder` - Builder pattern
- `@PreUpdate` - Auto timestamp updates
- Proper column annotations

### DTOs (Data Transfer Objects)
All DTOs in `dto/` package:
- Separate from entities for API contracts
- String dates (JSON serialization)
- Optional fields support

### Exception Handling
- **ResourceNotFoundException**: Factory methods for specific not found cases
- **GlobalExceptionHandler**: Centralized error handling with standardized JSON responses

## Data Flow

### Request Flow
```
HTTP Request
    ↓
Controller (validates input, HTTP layer)
    ↓
Service (business logic)
    ↓
Repository (JPA, database access)
    ↓
Database
```

### Response Flow
```
Database
    ↓
Repository (Entity)
    ↓
Service (Entity → DTO conversion)
    ↓
Controller (DTO → JSON serialization)
    ↓
HTTP Response (JSON)
```

## Database Schema

### Planets Table
```sql
- id (Primary Key)
- name (Unique)
- type
- size_km
- distance_from_sun_km
- surface_temperature_celsius
- gravity_ms2
- orbital_period_days
- rotation_period_hours
- description
- has_rings
- moons_count
- color_hex
- is_habitable
- created_at
- updated_at
```

### Simulations Table
```sql
- id (Primary Key)
- name
- description
- simulation_type
- planet_id (Foreign Key → planets.id)
- speed_multiplier
- duration_seconds
- status (CREATED, RUNNING, PAUSED, COMPLETED, FAILED)
- parameters (JSONB)
- created_at
- started_at
- ended_at
- updated_at
```

### Quizzes Table
```sql
- id (Primary Key)
- title
- description
- difficulty_level
- category
- total_questions
- duration_minutes
- passing_percentage
- questions (JSONB)
- is_published
- created_at
- updated_at
```

## Key Technologies

### Spring Boot Components
- **spring-boot-starter-web**: REST API support
- **spring-boot-starter-data-jpa**: ORM layer
- **spring-boot-starter-validation**: Input validation
- **spring-boot-starter-test**: Testing framework

### Database
- **PostgreSQL**: Relational database
- **Flyway**: Database migration tool
- **JSONB**: JSON support for complex data

### Development Tools
- **Lombok**: Reduce boilerplate code
- **Swagger/OpenAPI**: API documentation
- **SLF4J**: Logging framework

## Best Practices Implemented

1. **Layer Separation**: Clear separation of concerns
2. **Dependency Injection**: Spring manages dependencies
3. **Transaction Management**: Proper transaction handling in services
4. **Exception Handling**: Global exception handler for consistency
5. **Logging**: Debug-level logging in services
6. **Database Migrations**: Version-controlled schema changes
7. **DTOs**: Decoupling API from internal models
8. **Repository Pattern**: Data access abstraction
9. **Builder Pattern**: Fluent object creation
10. **Annotations**: Leverage Spring annotations effectively

## Future Enhancements

- [ ] Add QuizService implementation
- [ ] Implement user authentication (Spring Security)
- [ ] Add caching layer (Redis)
- [ ] WebSocket support for real-time updates
- [ ] API rate limiting
- [ ] Request/Response interceptors
- [ ] Aspect-oriented programming for cross-cutting concerns
- [ ] Elasticsearch for advanced search
- [ ] Message queues (RabbitMQ/Kafka)
- [ ] CI/CD pipeline integration

## Development Tips

### Adding a New Feature
1. Create entity in `entity/`
2. Create repository extending `JpaRepository`
3. Create service with business logic
4. Create controller with REST endpoints
5. Add database migration
6. Write unit tests
7. Update documentation

### Testing Strategy
- Unit tests for services
- Integration tests for repositories
- Controller tests with MockMvc
- Database tests with @DataJpaTest

### Debugging
- Enable SQL logging: `spring.jpa.show-sql=true`
- Enable parameter binding: `logging.level.org.hibernate.type=TRACE`
- Check Flyway history: `SELECT * FROM flyway_schema_history;`

