# SkillMatch

SkillMatch is a microservices-based job application platform designed to connect candidates and recruiters. It provides a scalable, modular architecture for managing users, job postings, applications, notifications, and more.

## Architecture Overview

- **Service Registry (Eureka):** Service discovery and registration.
- **API Gateway (Spring Cloud Gateway):** Central entry point for all backend services.
- **User Service:** Manages users (candidates & recruiters), authentication, and profiles.
- **Job Service:** Handles job postings and related operations.
- **Application Service:** Allows candidates to apply for jobs and recruiters to track applications.
- **Notification Service:** Sends notifications (e.g., application updates).
- **UI (React):** Frontend interface for users.
- **MySQL:** Database for persistence.
- **Kafka:** Message broker for asynchronous communication between services.

## Project Structure

```
/microservices   # Microservices (User, Job, Application, Notification), Eureka, API Gateway
/frontend        # React UI
```

## Prerequisites

- Java 17+
- Maven
- Node.js 20+
- Docker & Docker Compose

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/skillmatch.git
cd skillmatch
```

### 2. Build backend services

For each Spring Boot service (user-service, job-service, application-service, etc.), run:

```bash
cd microservices
mvn clean package -DskipTests
docker build -t <service-name> .
cd ..
```

### 3. Build frontend UI

```bash
cd frontend
docker build -t ui .
```

### 4. Running the Project

Start all services with Docker Compose:

```bash
docker-compose up -d
```

### Access the Application

- **UI:** [http://localhost:5173](http://localhost:5173)
- **Eureka Dashboard:** [http://localhost:8761](http://localhost:8761)
- **API Gateway:** [http://localhost:8080](http://localhost:8080)