## AI Task Manager Service

Backend Express.js service with MongoDB for managing users and tasks.

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (database hosted on MongoDB Atlas)
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
- Use your MongoDB Atlas connection string.

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

**Deployment on Server:**

1. Copy the `.env` file to your server (manually place it in the same directory as the Dockerfile)
2. Run the container:

```powershell
docker run -p 8000:8000 --env-file .env ai-task-manager-service
```

Or if you prefer to pass environment variables directly:

```powershell
docker run -p 8000:8000 `
  -e MONGODB_URI="mongodb://host.docker.internal:27017/ai-task-management" `
  -e JWT_SECRET="your-secret" `
  -e PORT=8000 `
  ai-task-manager-service
```

**Notes:**
- The `.env` file must be manually placed on the server before running the container
- All required configuration is handled through the Dockerfile
- MongoDB is hosted on MongoDB Atlas, not in a Docker container
- Make sure your Atlas cluster is accessible and your server's IP is whitelisted in Atlas network access settings

Health check: `GET /api/health`

### Useful Endpoints
- `GET /api/health` — service status
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/tasks` and related task routes

### Troubleshooting
- Cannot connect to MongoDB Atlas: 
  - Verify your `MONGODB_URI` connection string is correct
  - Check that your IP address is whitelisted in MongoDB Atlas Network Access settings
  - Ensure your MongoDB Atlas cluster is running and accessible
  - For Docker containers, make sure the container can reach MongoDB Atlas (check network settings)
- Port already in use: change `PORT` or stop the conflicting process.
- JWT errors: ensure `JWT_SECRET` is set and consistent across instances.
- MongoDB Atlas connection issues: 
  - Verify username and password in connection string
  - Check cluster status in MongoDB Atlas dashboard
  - Ensure database name in connection string matches your Atlas database


