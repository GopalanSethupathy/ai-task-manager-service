# Backend Environment Setup

Create a `.env` file in the backend directory with the following:

```
MONGODB_URI=mongodb://localhost:27017/ai-task-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=8000
```

**Important**: 
- Change `JWT_SECRET` to a strong random string in production
- For MongoDB Atlas, use your connection string instead of local MongoDB
- Update `PORT` if you need a different port

