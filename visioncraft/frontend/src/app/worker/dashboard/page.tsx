"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, 
  FaCalendar, 
  FaCheckCircle, 
  FaClock, 
  FaEdit,
  FaWhatsapp,
  FaFileUpload,
  FaCode,
  FaVideo,
  FaPalette,
  FaChartLine
} from 'react-icons/fa';

interface WorkerData {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  skills: string[];
  experience: string;
  bio: string;
  portfolio: string;
  status: string;
  createdAt: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  status: string;
  clientPhone?: string;
  clientEmail?: string;
  updates: ProjectUpdate[];
}

interface ProjectUpdate {
  id: number;
  date: string;
  message: string;
  files?: string[];
}

const getRoleSpecificContent = (service: string) => {
  switch (service) {
    case 'software-development':
      return {
        icon: FaCode,
        title: 'Software Developer',
        metrics: ['Code Commits', 'Pull Requests', 'Bug Fixes', 'Features'],
        tools: ['GitHub', 'VS Code', 'Terminal', 'DevTools'],
        projectTypes: ['Web App', 'Mobile App', 'API', 'Database']
      };
    case 'video-production':
      return {
        icon: FaVideo,
        title: 'Video Producer',
        metrics: ['Videos Edited', 'Minutes Produced', 'Renders', 'Effects'],
        tools: ['Premier Pro', 'After Effects', 'DaVinci', 'Audition'],
        projectTypes: ['Commercial', 'Corporate', 'Social Media', 'Event']
      };
    case 'graphic-design':
      return {
        icon: FaPalette,
        title: 'Graphic Designer',
        metrics: ['Designs Created', 'Brand Assets', 'Illustrations', 'Mockups'],
        tools: ['Photoshop', 'Illustrator', 'Figma', 'Sketch'],
        projectTypes: ['Brand Identity', 'UI/UX', 'Print', 'Social Media']
      };
    case 'digital-marketing':
      return {
        icon: FaChartLine,
        title: 'Digital Marketer',
        metrics: ['Campaigns', 'Leads', 'Conversions', 'ROI'],
        tools: ['Analytics', 'Ad Manager', 'SEO Tools', 'CRM'],
        projectTypes: ['SEO', 'PPC', 'Social Media', 'Email']
      };
    default:
      return {
        icon: FaBriefcase,
        title: 'Professional',
        metrics: ['Projects', 'Tasks', 'Hours', 'Deadlines'],
        tools: ['General Tools'],
        projectTypes: ['Various Projects']
      };
  }
};

const getServiceSpecificProjects = (service: string) => {
  switch (service) {
    case 'video-production':
      return [
        {
          id: 1,
          title: "Corporate Training Video",
          description: "Create a professional training video series for TechCorp",
          deadline: "2024-04-30",
          progress: 65,
          status: "In Progress",
          clientPhone: "+1234567890",
          clientEmail: "techcorp@example.com",
          updates: [
            {
              id: 1,
              date: "2024-03-15",
              message: "Completed first draft of script",
              files: ["script-draft-1.pdf"]
            }
          ]
        },
        {
          id: 2,
          title: "Product Launch Video",
          description: "Create promotional video for new product launch",
          deadline: "2024-05-15",
          progress: 30,
          status: "In Progress",
          clientPhone: "+1987654321",
          clientEmail: "marketing@example.com",
          updates: []
        }
      ];
    case 'software-development':
      return [
        {
          id: 1,
          title: "E-commerce Platform",
          description: "Building a modern e-commerce solution with React and Node.js",
          deadline: "2024-04-30",
          progress: 75,
          status: "In Progress",
          clientPhone: "+1234567890",
          clientEmail: "client@example.com",
          updates: [
            {
              id: 1,
              date: "2024-03-15",
              message: "Completed user authentication module",
              files: ["auth-docs.pdf"]
            }
          ]
        },
        {
          id: 2,
          title: "Mobile App Development",
          description: "Creating a cross-platform mobile application",
          deadline: "2024-05-15",
          progress: 30,
          status: "In Progress",
          clientPhone: "+1987654321",
          clientEmail: "mobile@example.com",
          updates: []
        }
      ];
    case 'graphic-design':
      return [
        {
          id: 1,
          title: "Brand Identity Package",
          description: "Complete brand identity design including logo and guidelines",
          deadline: "2024-04-30",
          progress: 80,
          status: "In Progress",
          clientPhone: "+1234567890",
          clientEmail: "brand@example.com",
          updates: [
            {
              id: 1,
              date: "2024-03-15",
              message: "Logo concepts approved",
              files: ["logo-concepts.pdf"]
            }
          ]
        },
        {
          id: 2,
          title: "Social Media Templates",
          description: "Design template pack for Instagram and Facebook",
          deadline: "2024-05-15",
          progress: 45,
          status: "In Progress",
          clientPhone: "+1987654321",
          clientEmail: "social@example.com",
          updates: []
        }
      ];
    case 'digital-marketing':
      return [
        {
          id: 1,
          title: "SEO Optimization Campaign",
          description: "Improve website ranking and organic traffic",
          deadline: "2024-04-30",
          progress: 70,
          status: "In Progress",
          clientPhone: "+1234567890",
          clientEmail: "seo@example.com",
          updates: [
            {
              id: 1,
              date: "2024-03-15",
              message: "Completed keyword research",
              files: ["keyword-analysis.pdf"]
            }
          ]
        },
        {
          id: 2,
          title: "Social Media Campaign",
          description: "Launch and manage multi-platform social campaign",
          deadline: "2024-05-15",
          progress: 35,
          status: "In Progress",
          clientPhone: "+1987654321",
          clientEmail: "social@example.com",
          updates: []
        }
      ];
    default:
      return [];
  }
};

export default function WorkerDashboard() {
  const router = useRouter();
  const [workerData, setWorkerData] = useState<WorkerData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newUpdate, setNewUpdate] = useState({ message: '', files: [] });
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('workerAuthenticated');
    if (!isAuthenticated) {
      router.push('/worker/login');
      return;
    }

    // Load worker data
    const storedWorkerData = localStorage.getItem('workerData');
    if (storedWorkerData) {
      const worker = JSON.parse(storedWorkerData);
      setWorkerData(worker);
      // Set projects based on worker's service
      setProjects(getServiceSpecificProjects(worker.service));
    }

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('workerAuthenticated');
    localStorage.removeItem('workerRole');
    router.push('/worker/login');
  };

  const handleSendWhatsApp = (phone: string, projectTitle: string) => {
    const message = encodeURIComponent(`Update regarding project: ${projectTitle}`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleAddUpdate = (projectId: number) => {
    if (!newUpdate.message) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          updates: [
            ...project.updates,
            {
              id: Date.now(),
              date: new Date().toISOString(),
              message: newUpdate.message,
              files: newUpdate.files
            }
          ]
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setNewUpdate({ message: '', files: [] });
    setShowUpdateForm(false);
  };

  if (isLoading || !workerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1E51] to-[#4B0082] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const roleContent = getRoleSpecificContent(workerData.service);
  const RoleIcon = roleContent.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1E51] to-[#4B0082] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#00F0FF] rounded-lg">
                <RoleIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome, {workerData.fullName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {roleContent.title}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {roleContent.metrics.map((metric, index) => (
            <motion.div
              key={metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-yellow-500' : 'bg-purple-500'} rounded-lg`}>
                  {index === 0 ? <FaBriefcase className="h-6 w-6 text-white" /> :
                   index === 1 ? <FaCheckCircle className="h-6 w-6 text-white" /> :
                   index === 2 ? <FaClock className="h-6 w-6 text-white" /> :
                   <FaCalendar className="h-6 w-6 text-white" />}
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{metric}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {index === 0 ? projects.length :
                     index === 1 ? '12' :
                     index === 2 ? '87' :
                     '3d'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Current Projects</h2>
            <button className="px-4 py-2 bg-[#00F0FF] text-white rounded-md hover:bg-[#00D0DD] focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:ring-offset-2">
              Add Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      aria-label={`Send WhatsApp message for ${project.title}`}
                      onClick={() => project.clientPhone && handleSendWhatsApp(project.clientPhone, project.title)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <FaWhatsapp className="h-5 w-5" />
                    </button>
                    <button
                      aria-label={`Add update for ${project.title}`}
                      onClick={() => {
                        setSelectedProject(project);
                        setShowUpdateForm(true);
                      }}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaFileUpload className="h-5 w-5" />
                    </button>
                    <button 
                      aria-label={`Edit ${project.title}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-[#00F0FF]"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                  </div>
                </div>
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
                      className="bg-[#00F0FF] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      Status: {project.status}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      Due: {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Project Updates */}
                  {project.updates.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recent Updates</h4>
                      <div className="space-y-2">
                        {project.updates.map(update => (
                          <div key={update.id} className="bg-white dark:bg-gray-600 p-2 rounded-md">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>{new Date(update.date).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{update.message}</p>
                            {update.files && update.files.length > 0 && (
                              <div className="flex gap-2 mt-2">
                                {update.files.map(file => (
                                  <span key={file} className="text-xs text-blue-500 flex items-center">
                                    <FaFileUpload className="h-3 w-3 mr-1" />
                                    {file}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Update Form Modal */}
        {showUpdateForm && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Add Update for {selectedProject.title}
              </h3>
              <textarea
                value={newUpdate.message}
                onChange={(e) => setNewUpdate({ ...newUpdate, message: e.target.value })}
                placeholder="Enter your update message..."
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 dark:bg-gray-700 dark:text-white"
                rows={4}
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddUpdate(selectedProject.id)}
                  className="px-4 py-2 bg-[#00F0FF] text-white rounded-md hover:bg-[#00D0DD]"
                >
                  Send Update
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tools & Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {roleContent.tools.map(tool => (
              <div key={tool} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-gray-900 dark:text-white font-medium">{tool}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
            <button className="px-4 py-2 bg-[#00F0FF] text-white rounded-md hover:bg-[#00D0DD] focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:ring-offset-2">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                  <p className="text-gray-900 dark:text-white">{workerData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-gray-900 dark:text-white">{workerData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="text-gray-900 dark:text-white">{workerData.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Professional Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Service Area</p>
                  <p className="text-gray-900 dark:text-white">
                    {workerData.service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                  <p className="text-gray-900 dark:text-white">{workerData.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Skills</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {workerData.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-[#00F0FF]/10 text-[#00F0FF] rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 