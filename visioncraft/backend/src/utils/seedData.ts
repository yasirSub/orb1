import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database';
import User, { UserRole } from '../models/User';
import Project, { ProjectStatus } from '../models/Project';
import Comment from '../models/Comment';

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

// Sample data - Users
const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@orb1.com',
    password: 'password123',
    role: UserRole.ADMIN,
    bio: 'Admin and founder of Orb1 Agency.',
    skills: ['Management', 'Business Development', 'Client Relations']
  },
  {
    id: 2,
    name: 'Worker User',
    email: 'worker@orb1.com',
    password: 'password123',
    role: UserRole.WORKER,
    bio: 'Senior developer at Orb1 Agency.',
    skills: ['Web Development', 'UI/UX Design', 'Mobile Development']
  },
  {
    id: 3,
    name: 'Visitor User',
    email: 'visitor@orb1.com',
    password: 'password123',
    role: UserRole.VISITOR,
    bio: 'Interested in Orb1 services.'
  }
];

// Sample data - Projects
const projects = [
  {
    title: 'E-commerce Website Redesign',
    description: 'Complete redesign of an e-commerce website with modern UI and improved UX.',
    status: ProjectStatus.COMPLETED,
    client: 'Fashion Outlet Inc.',
    startDate: new Date('2023-01-15'),
    endDate: new Date('2023-03-30'),
    images: ['project1-image1.jpg', 'project1-image2.jpg'],
    tags: ['Web Development', 'UI/UX', 'E-commerce'],
    budget: 8000
  },
  {
    title: 'Mobile App Development',
    description: 'Developing a cross-platform mobile app for a food delivery service.',
    status: ProjectStatus.IN_PROGRESS,
    client: 'Quick Bites LLC',
    startDate: new Date('2023-04-10'),
    images: ['project2-image1.jpg'],
    tags: ['Mobile App', 'React Native', 'UI/UX'],
    budget: 12000
  },
  {
    title: 'Corporate Branding Package',
    description: 'Creating a complete branding package including logo, business cards, and stationery.',
    status: ProjectStatus.PENDING,
    client: 'New Horizons Inc.',
    tags: ['Branding', 'Graphic Design', 'Logo Design'],
    budget: 5000
  }
];

// Sample data - Comments
const comments = [
  {
    content: 'Great work on the project! The website looks amazing and the UX is top-notch.',
    likes: 5
  },
  {
    content: 'The redesign has significantly improved our conversion rates. Thank you!',
    likes: 3
  },
  {
    content: 'Looking forward to working with Orb1 again in the future!',
    likes: 2
  }
];

// Seed Database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Comment.deleteMany({});

    console.log('🧹 Data cleared successfully');

    // Seed users
    const createdUsers = await User.insertMany(users);
    console.log(`👤 ${createdUsers.length} users created`);

    // Get worker user ID
    const workerUser = createdUsers.find(user => user.role === UserRole.WORKER);
    const visitorUser = createdUsers.find(user => user.role === UserRole.VISITOR);

    // Seed projects with worker assigned
    const projectsWithWorker = projects.map(project => ({
      ...project,
      assignedWorker: workerUser?._id
    }));

    const createdProjects = await Project.insertMany(projectsWithWorker);
    console.log(`📋 ${createdProjects.length} projects created`);

    // Assign projects to worker
    if (workerUser) {
      workerUser.assignedProjects = createdProjects.map(project => project._id) as any;
      await workerUser.save();
      console.log('📝 Projects assigned to worker');
    }

    // Seed comments for the completed project
    const completedProject = createdProjects.find(
      project => project.status === ProjectStatus.COMPLETED
    );

    if (completedProject && visitorUser) {
      const commentsWithRefs = comments.map(comment => ({
        ...comment,
        user: visitorUser._id,
        project: completedProject._id
      }));

      const createdComments = await Comment.insertMany(commentsWithRefs);
      console.log(`💬 ${createdComments.length} comments created`);
    }

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 