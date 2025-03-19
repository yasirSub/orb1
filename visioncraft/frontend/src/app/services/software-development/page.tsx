"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaMobile, FaDatabase } from 'react-icons/fa';

interface Worker {
  id: number;
  fullName: string;
  service: string;
  skills: string[];
  experience: string;
  bio: string;
  portfolio: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;
}

export default function SoftwareDevelopmentPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const storedWorkerData = localStorage.getItem('workerData');
    if (storedWorkerData) {
      const worker = JSON.parse(storedWorkerData);
      if (worker.service === 'software-development') {
        setWorkers([worker]);
      }
    }

    // Mock projects data
    setProjects([
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Building a modern e-commerce solution",
        progress: 75,
        status: "In Progress"
      },
      {
        id: 2,
        title: "Mobile App Development",
        description: "Creating a cross-platform mobile application",
        progress: 40,
        status: "In Progress"
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1E51] to-[#4B0082] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Software Development Services
          </h1>
          <p className="text-xl text-gray-300">
            Building innovative solutions for your digital needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Expertise
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <FaCode className="h-6 w-6 text-[#00F0FF]" />
                <span>Web Development</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <FaLaptopCode className="h-6 w-6 text-[#00F0FF]" />
                <span>Custom Solutions</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <FaMobile className="h-6 w-6 text-[#00F0FF]" />
                <span>Mobile Apps</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <FaDatabase className="h-6 w-6 text-[#00F0FF]" />
                <span>Database Design</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Process
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>1. Requirements Analysis and Planning</li>
              <li>2. Design and Architecture</li>
              <li>3. Development and Testing</li>
              <li>4. Deployment and Maintenance</li>
            </ul>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Our Development Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.map(worker => (
              <div key={worker.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {worker.fullName}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {worker.experience} of experience
                </p>
                <div className="mb-2">
                  <h4 className="font-medium text-gray-700 dark:text-gray-200">Skills:</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {worker.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-[#00F0FF]/10 text-[#00F0FF] rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {worker.bio}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Current Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {project.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-[#00F0FF] h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Status: {project.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 