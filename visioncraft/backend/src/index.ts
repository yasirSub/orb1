import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import connectDB from './config/database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app: Express = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from the data directory
app.use('/data', express.static(path.join(__dirname, '../data')));

// Import routes
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import commentRoutes from './routes/commentRoutes';

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/comments', commentRoutes);

// Mock admin user (in a real app, this would be in a database)
const adminUser = {
  id: 1,
  email: 'admin@example.com',
  // This is the hashed version of 'admin123'
  password: '$2a$10$XQWKYYwZqX7ZjPZtR5HwkOdZuX0z5GZ6.LqK6.hkQxWa1jGrq9y6e'
};

// JWT secret (in a real app, this would be in an environment variable)
const JWT_SECRET = 'your-secret-key';

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    if (email !== adminUser.email) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, adminUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: adminUser.id, email: adminUser.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route example
app.get('/api/admin/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json(decoded);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Base route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Orb1 Agency API',
    status: 'running'
  });
});

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'healthy',
    storage: 'MongoDB'
  });
});

// Start server
app.listen(port, () => {
  console.log(`🌐 Server running on port ${port}`);
  console.log(`💾 Using MongoDB for data storage`);
}); 