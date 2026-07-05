# Quick Start Guide - Deep Space Explorer API

## 1️⃣ Prerequisites

```bash
# Check Java version (need 17+)
java -version

# Check Maven version
mvn -version

# Install PostgreSQL (if not already installed)
brew install postgresql  # macOS
# or
sudo apt-get install postgresql  # Linux
```

## 2️⃣ Database Setup (5 minutes)

```bash
# Start PostgreSQL
brew services start postgresql  # macOS
# or
sudo systemctl start postgresql  # Linux

# Login to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE deepspace_db;
CREATE USER deepspace_user WITH ENCRYPTED PASSWORD 'deepspace_password';
GRANT ALL PRIVILEGES ON DATABASE deepspace_db TO deepspace_user;

# Exit
\q
```

## 3️⃣ Build & Run

```bash
# Navigate to project
cd deepspace-api

# Build project
mvn clean install -DskipTests

# Run application
mvn spring-boot:run
```

**Server starts at**: http://localhost:8080/api

## 4️⃣ Try the API

### Option A: Using curl

```bash
# Get all planets
curl http://localhost:8080/api/v1/planets

# Get specific planet
curl http://localhost:8080/api/v1/planets/1

# Create new planet
curl -X POST http://localhost:8080/api/v1/planets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kepler-452b",
    "type": "terrestrial",
    "size": 13000,
    "distanceFromSun": 0,
    "surfaceTemperature": 25,
    "gravity": 10.2,
    "description": "Earth-like exoplanet",
    "colorHex": "#4169e1",
    "isHabitable": true
  }'
```

### Option B: Using API Docs (Swagger UI)

1. Open browser: **http://localhost:8080/api/swagger-ui.html**
2. Try endpoints directly from UI
3. See real-time API documentation

### Option C: Using Postman

1. Import API collection
2. Set base URL: `http://localhost:8080/api`
3. Start making requests

## 5️⃣ Key API Endpoints

### Planets
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/planets` | Get all planets |
| GET | `/v1/planets/{id}` | Get planet by ID |
| POST | `/v1/planets` | Create planet |
| PUT | `/v1/planets/{id}` | Update planet |
| DELETE | `/v1/planets/{id}` | Delete planet |

### Simulations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/simulations` | Get all simulations |
| POST | `/v1/simulations` | Create simulation |
| POST | `/v1/simulations/{id}/start` | Start simulation |
| POST | `/v1/simulations/{id}/pause` | Pause simulation |

## 6️⃣ File Structure

```
deepspace-api/
├── src/main/java/com/deepspace/
│   ├── controller/        # REST endpoints
│   ├── service/          # Business logic
│   ├── repository/       # Database access
│   ├── entity/          # JPA models
│   └── dto/             # Data transfer objects
├── src/main/resources/
│   ├── application.yml   # Configuration
│   └── db/migration/     # Database migrations
└── pom.xml              # Maven dependencies
```

## 7️⃣ Sample Response

```json
{
  "id": 1,
  "name": "Earth",
  "type": "terrestrial",
  "size": 12742,
  "distanceFromSun": 149600000,
  "surfaceTemperature": 15,
  "gravity": 9.8,
  "orbitalPeriod": 365,
  "rotationPeriod": 24,
  "description": "The blue marble - Our home",
  "hasRings": false,
  "moonsCount": 1,
  "colorHex": "#1e90ff",
  "isHabitable": true,
  "createdAt": "2024-04-25T10:30:00",
  "updatedAt": "2024-04-25T10:30:00"
}
```

## 8️⃣ Troubleshooting

### Port 8080 already in use?
```bash
# Change port in application.yml
server.port=8081
```

### Database connection failed?
```bash
# Check PostgreSQL status
psql -U deepspace_user -d deepspace_db -h localhost

# If error, check credentials in application.yml
```

### Build fails?
```bash
# Clear cache and rebuild
mvn clean
mvn install -DskipTests
```

## 9️⃣ Next Steps

1. ✅ **Read** `README.md` for detailed documentation
2. ✅ **Explore** `PROJECT_STRUCTURE.md` for architecture
3. ✅ **Code** your own endpoints following the pattern
4. ✅ **Test** with Swagger UI or Postman
5. ✅ **Deploy** to production

## 🔟 Development Tips

### Add Debug Logging
Edit `application.yml`:
```yaml
logging:
  level:
    com.deepspace: DEBUG
    org.hibernate.SQL: DEBUG
```

### View Generated SQL
```yaml
spring.jpa.show-sql: true
```

### Run Tests
```bash
mvn test
```

### Package for Production
```bash
mvn package
java -jar target/deepspace-api-2.0.0.jar
```

---

**Need help?** Check README.md or PROJECT_STRUCTURE.md for detailed information.

**API Documentation**: http://localhost:8080/api/swagger-ui.html

**Status**: http://localhost:8080/api/actuator/health
