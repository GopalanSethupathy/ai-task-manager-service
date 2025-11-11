require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-task-management';

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    // Create test users
    const user1 = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });
    await user1.save();
    console.log('Created user: john@example.com');

    const user2 = new User({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123'
    });
    await user2.save();
    console.log('Created user: jane@example.com');

    // Create tasks for user1
    const tasks1 = [
      {
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the AI Task Management App',
        priority: 'high',
        status: 'in-progress',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        userId: user1._id
      },
      {
        title: 'Review code changes',
        description: 'Review pull requests and provide feedback',
        priority: 'medium',
        status: 'pending',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        userId: user1._id
      },
      {
        title: 'Update dependencies',
        description: 'Update npm packages to latest versions',
        priority: 'low',
        status: 'completed',
        userId: user1._id
      }
    ];

    for (const taskData of tasks1) {
      const task = new Task(taskData);
      await task.save();
    }
    console.log(`Created ${tasks1.length} tasks for user1`);

    // Create tasks for user2
    const tasks2 = [
      {
        title: 'Design new feature',
        description: 'Create mockups for the new dashboard feature',
        priority: 'high',
        status: 'pending',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        userId: user2._id
      },
      {
        title: 'Team meeting',
        description: 'Attend weekly team standup',
        priority: 'medium',
        status: 'completed',
        userId: user2._id
      }
    ];

    for (const taskData of tasks2) {
      const task = new Task(taskData);
      await task.save();
    }
    console.log(`Created ${tasks2.length} tasks for user2`);

    console.log('Seed data created successfully!');
    console.log('\nTest credentials:');
    console.log('User 1: john@example.com / password123');
    console.log('User 2: jane@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();

