## AI Task Manager Service

Backend Express.js service with MongoDB for managing users and tasks.

### Prerequisites
- Node.js 18+
- MongoDB (local or hosted)
- Docker (optional, for containerized runs)

### Environment Variables
Create a `.env` file in the project root:

```bash
MONGODB_URI=mongodb://localhost:27017/ai-task-management
JWT_SECRET=change-this-in-production
PORT=8000
```

Notes:
- Set a strong `JWT_SECRET` in production.
- Use your MongoDB Atlas connection string if not using local MongoDB.

### Install and Run Locally
PowerShell:

```powershell
npm ci
npm start
```

The server listens on `http://localhost:8000`. Health check: `GET /api/health`.

### Seed Data (optional)
If you have seed logic in `seed.js`, you can run:

```powershell
node seed.js
```

### Run with Docker
Build the image:

```powershell
docker build -t ai-task-manager-service .
```

Run the container:

```powershell
docker run -p 8000:8000 `
  -e MONGODB_URI="mongodb://host.docker.internal:27017/ai-task-management" `
  -e JWT_SECRET="your-secret" `
  -e PORT=8000 `
  ai-task-manager-service
```

Health check inside the container hits `GET /api/health`.

### Docker Compose (local MongoDB example)
Create a `docker-compose.yml` like:

```yaml
version: "3.9"
services:
  mongo:
    image: mongo:7
    restart: unless-stopped
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

  api:
    image: ai-task-manager-service
    depends_on:
      - mongo
    environment:
      MONGODB_URI: mongodb://mongo:27017/ai-task-management
      JWT_SECRET: your-secret
      PORT: 8000
    ports:
      - "8000:8000"

volumes:
  mongo_data:
```

Then:

```powershell
docker compose up -d --build
```

### Useful Endpoints
- `GET /api/health` — service status
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/tasks` and related task routes

### Troubleshooting
- Cannot connect to MongoDB: verify `MONGODB_URI` and that Mongo is reachable from the container (use `host.docker.internal` on Windows/macOS).
- Port already in use: change `PORT` or stop the conflicting process.
- JWT errors: ensure `JWT_SECRET` is set and consistent across instances.


