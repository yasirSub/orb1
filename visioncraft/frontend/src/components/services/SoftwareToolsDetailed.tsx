"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFigma,
  FaReact,
  FaPython,
  FaNodeJs,
  FaWordpress,
  FaJava,
  FaPhp,
  FaAngular,
  FaVuejs,
  FaAws,
  FaDocker,
  FaGithub,
  FaGitlab
} from 'react-icons/fa';
import { 
  SiAdobephotoshop, 
  SiAdobeillustrator, 
  SiAdobepremierepro, 
  SiAdobeaftereffects, 
  SiBlender, 
  SiCinema4D, 
  SiSketch, 
  SiNextdotjs, 
  SiTensorflow, 
  SiPytorch, 
  SiAutodesk,
  SiUnrealengine
} from 'react-icons/si';

// Define categories for filtering
const categories = [
  'All',
  'Design & Photography',
  'Video & Motion',
  'Web Development',
  'Programming',
  'DevOps & Cloud'
];

// Define the software tools with their names, categories, icons, and detailed descriptions
const softwareTools = [
  {
    name: 'Adobe Photoshop',
    category: 'Design & Photography',
    icon: SiAdobephotoshop,
    color: '#31A8FF',
    description: 'We use Adobe Photoshop for professional photo editing, digital painting, and creating high-quality graphics. Our experts leverage advanced features like layers, masks, and filters to deliver stunning visuals for your brand.',
    useCases: [
      'Photo retouching and enhancement',
      'Digital artwork creation',
      'UI element design',
      'Social media graphics',
      'Marketing materials'
    ]
  },
  {
    name: 'Adobe Illustrator',
    category: 'Design & Photography',
    icon: SiAdobeillustrator,
    color: '#FF9A00',
    description: 'Adobe Illustrator is our go-to tool for creating vector graphics, logos, icons, and illustrations. We create scalable designs that maintain quality at any size, perfect for branding materials and marketing assets.',
    useCases: [
      'Logo design',
      'Brand identity systems',
      'Custom illustrations',
      'Infographics',
      'Print materials'
    ]
  },
  {
    name: 'Adobe Premiere Pro',
    category: 'Video & Motion',
    icon: SiAdobepremierepro,
    color: '#9999FF',
    description: 'Our video production team uses Adobe Premiere Pro for professional video editing, color grading, and audio enhancement. We create compelling video content that engages your audience and tells your story effectively.',
    useCases: [
      'Commercial video production',
      'Social media video content',
      'Corporate videos',
      'Product demonstrations',
      'Event coverage'
    ]
  },
  {
    name: 'Adobe After Effects',
    category: 'Video & Motion',
    icon: SiAdobeaftereffects,
    color: '#9999FF',
    description: 'We leverage Adobe After Effects to create stunning motion graphics, visual effects, and animations. Our motion designers bring your brand to life with dynamic content that captures attention and communicates your message.',
    useCases: [
      'Motion graphics',
      'Visual effects',
      'Animated logos',
      'UI animations',
      'Explainer videos'
    ]
  },
  {
    name: 'Blender',
    category: '3D Modeling',
    icon: SiBlender,
    color: '#F5792A',
    description: 'Blender is our open-source 3D creation suite for modeling, rigging, animation, simulation, rendering, and compositing. We create detailed 3D models and animations for various applications, from product visualization to architectural visualization.',
    useCases: [
      '3D product modeling',
      'Architectural visualization',
      'Character modeling and animation',
      'Product demonstrations',
      'Virtual environments'
    ]
  },
  {
    name: 'Cinema 4D',
    category: '3D Modeling',
    icon: SiCinema4D,
    color: '#011A6A',
    description: 'Cinema 4D is our professional 3D modeling, animation, and rendering software. We use it to create high-quality 3D content for advertising, product visualization, and motion graphics projects that require precision and realism.',
    useCases: [
      'Product visualization',
      'Motion graphics integration',
      'Architectural visualization',
      'Logo animations',
      'Virtual product demonstrations'
    ]
  },
  {
    name: 'Autodesk Maya',
    category: '3D Modeling',
    icon: SiAutodesk,
    color: '#0696D7',
    description: 'Autodesk Maya is our industry-standard 3D animation, modeling, simulation, and rendering software. We use Maya for complex 3D projects that require advanced rigging, animation, and effects capabilities.',
    useCases: [
      'Complex 3D modeling',
      'Character animation',
      'Visual effects',
      'Virtual reality content',
      'Architectural visualization'
    ]
  },
  {
    name: 'Unreal Engine',
    category: '3D Modeling',
    icon: SiUnrealengine,
    color: '#0E1128',
    description: 'We use Unreal Engine for creating interactive 3D experiences, virtual reality applications, and real-time visualizations. This powerful game engine allows us to create immersive environments and interactive product demonstrations.',
    useCases: [
      'Interactive product demonstrations',
      'Virtual reality experiences',
      'Architectural walkthroughs',
      'Real-time visualizations',
      'Interactive training simulations'
    ]
  },
  {
    name: 'Figma',
    category: 'Design & Photography',
    icon: FaFigma,
    color: '#F24E1E',
    description: 'Figma is our collaborative interface design tool for creating user interfaces, prototypes, and design systems. We use Figma to design and prototype websites, mobile apps, and digital products with real-time collaboration.',
    useCases: [
      'UI/UX design',
      'Interactive prototyping',
      'Design system creation',
      'Collaborative design projects',
      'Client presentation mockups'
    ]
  },
  {
    name: 'Sketch',
    category: 'Design & Photography',
    icon: SiSketch,
    color: '#F7B500',
    description: 'Sketch is our professional digital design tool for creating user interfaces and website designs. We use Sketch to create pixel-perfect designs with powerful vector editing capabilities and a comprehensive symbol system.',
    useCases: [
      'UI/UX design',
      'Website mockups',
      'App interface design',
      'Icon design',
      'Design systems'
    ]
  },
  {
    name: 'React',
    category: 'Web Development',
    icon: FaReact,
    color: '#61DAFB',
    description: 'React is our JavaScript library of choice for building user interfaces. We create fast, responsive, and interactive web applications with component-based architecture that ensures maintainability and scalability.',
    useCases: [
      'Single-page applications',
      'Progressive web apps',
      'Interactive dashboards',
      'E-commerce platforms',
      'Content management systems'
    ]
  },
  {
    name: 'Next.js',
    category: 'Web Development',
    icon: SiNextdotjs,
    color: '#000000',
    description: 'Next.js is our React framework for production-grade applications. We leverage its server-side rendering, static site generation, and API routes to build fast, SEO-friendly, and feature-rich web applications.',
    useCases: [
      'E-commerce websites',
      'Corporate websites',
      'Content-heavy platforms',
      'SEO-optimized web applications',
      'Jamstack websites'
    ]
  },
  {
    name: 'Angular',
    category: 'Web Development',
    icon: FaAngular,
    color: '#DD0031',
    description: 'Angular is our comprehensive framework for building large-scale enterprise applications. We use Angular to create robust, maintainable, and scalable web applications with powerful features like dependency injection and reactive programming.',
    useCases: [
      'Enterprise web applications',
      'Dynamic web portals',
      'Progressive web apps',
      'Complex dashboards',
      'Real-time applications'
    ]
  },
  {
    name: 'Vue.js',
    category: 'Web Development',
    icon: FaVuejs,
    color: '#4FC08D',
    description: 'Vue.js is our progressive JavaScript framework for building user interfaces. We use Vue.js for its simplicity, flexibility, and performance, making it ideal for both small projects and large-scale applications.',
    useCases: [
      'Interactive web applications',
      'Single-page applications',
      'Progressive enhancement',
      'Prototyping',
      'Dashboard interfaces'
    ]
  },
  {
    name: 'Node.js',
    category: 'Programming',
    icon: FaNodeJs,
    color: '#339933',
    description: 'Node.js is our server-side JavaScript runtime for building scalable network applications. We use Node.js to create fast, efficient backend services, APIs, and real-time applications with JavaScript on the server.',
    useCases: [
      'RESTful APIs',
      'Real-time applications',
      'Microservices',
      'Server-side rendering',
      'Data streaming applications'
    ]
  },
  {
    name: 'Python',
    category: 'Programming',
    icon: FaPython,
    color: '#3776AB',
    description: 'Python is our versatile programming language for web development, data analysis, AI, and automation. We use Python for its readability, extensive libraries, and powerful frameworks to deliver efficient and maintainable solutions.',
    useCases: [
      'Backend web development',
      'Data analysis and visualization',
      'Machine learning applications',
      'Process automation',
      'Scientific computing'
    ]
  },
  {
    name: 'Java',
    category: 'Programming',
    icon: FaJava,
    color: '#007396',
    description: 'Java is our enterprise-grade programming language for building robust, scalable applications. We use Java for its reliability, performance, and platform independence to create enterprise solutions that stand the test of time.',
    useCases: [
      'Enterprise applications',
      'Android app development',
      'Large-scale web services',
      'Financial systems',
      'High-performance computing'
    ]
  },
  {
    name: 'PHP',
    category: 'Programming',
    icon: FaPhp,
    color: '#777BB4',
    description: 'PHP is our server-side scripting language for web development. We use PHP for its simplicity, wide hosting support, and powerful frameworks like Laravel to create dynamic websites and web applications.',
    useCases: [
      'Content management systems',
      'E-commerce websites',
      'Custom web applications',
      'API development',
      'Legacy system maintenance'
    ]
  },
  {
    name: 'WordPress',
    category: 'Web Development',
    icon: FaWordpress,
    color: '#21759B',
    description: 'WordPress is our content management system of choice for creating websites and blogs. We customize WordPress with themes and plugins to create powerful, flexible websites that clients can easily manage themselves.',
    useCases: [
      'Business websites',
      'Blogs and news sites',
      'E-commerce stores',
      'Portfolio websites',
      'Membership sites'
    ]
  },
  {
    name: 'TensorFlow',
    category: 'AI & Machine Learning',
    icon: SiTensorflow,
    color: '#FF6F00',
    description: 'TensorFlow is our open-source machine learning platform for building and deploying AI models. We use TensorFlow to develop custom AI solutions for image recognition, natural language processing, and predictive analytics.',
    useCases: [
      'Image and object recognition',
      'Natural language processing',
      'Predictive analytics',
      'Recommendation systems',
      'Anomaly detection'
    ]
  },
  {
    name: 'PyTorch',
    category: 'AI & Machine Learning',
    icon: SiPytorch,
    color: '#EE4C2C',
    description: 'PyTorch is our machine learning framework for research and production. We use PyTorch to develop and train deep learning models for computer vision, natural language processing, and other AI applications.',
    useCases: [
      'Deep learning research',
      'Computer vision applications',
      'Natural language processing',
      'Generative AI models',
      'Custom AI solutions'
    ]
  },
  {
    name: 'AWS',
    category: 'DevOps & Cloud',
    icon: FaAws,
    color: '#FF9900',
    description: 'Amazon Web Services (AWS) is our cloud computing platform of choice for hosting and scaling applications. We leverage AWS services to build secure, scalable, and cost-effective cloud solutions for businesses of all sizes.',
    useCases: [
      'Web application hosting',
      'Serverless architectures',
      'Database management',
      'Content delivery',
      'Machine learning infrastructure'
    ]
  },
  {
    name: 'Docker',
    category: 'DevOps & Cloud',
    icon: FaDocker,
    color: '#2496ED',
    description: 'Docker is our containerization platform for developing, shipping, and running applications. We use Docker to create consistent environments, simplify deployment, and improve scalability for modern applications.',
    useCases: [
      'Application containerization',
      'Microservices architecture',
      'Continuous integration/deployment',
      'Development environment standardization',
      'Multi-cloud deployments'
    ]
  },
  {
    name: 'GitHub',
    category: 'DevOps & Cloud',
    icon: FaGithub,
    color: '#181717',
    description: 'GitHub is our platform for version control, collaboration, and code management. We use GitHub to manage source code, track issues, automate workflows, and collaborate effectively on software development projects.',
    useCases: [
      'Source code management',
      'Collaborative development',
      'Continuous integration',
      'Project management',
      'Open-source contribution'
    ]
  },
  {
    name: 'GitLab',
    category: 'DevOps & Cloud',
    icon: FaGitlab,
    color: '#FC6D26',
    description: 'GitLab is our complete DevOps platform for the entire software development lifecycle. We use GitLab for version control, CI/CD pipelines, issue tracking, and project management in a single integrated platform.',
    useCases: [
      'End-to-end DevOps workflows',
      'Continuous integration/deployment',
      'Container registry',
      'Security scanning',
      'Project management'
    ]
  }
];

const SoftwareToolsDetailed = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTool, setSelectedTool] = useState(softwareTools[0]);

  // Filter tools based on selected category
  const filteredTools = selectedCategory === 'All' 
    ? softwareTools 
    : softwareTools.filter(tool => tool.category === selectedCategory);

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Technology Stack</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            We leverage industry-leading software and tools to deliver exceptional results across design, development, 
            3D modeling, video production, and AI solutions. Explore our toolkit below to learn how we use these technologies.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tools List */}
          <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-4">Software & Tools</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {filteredTools.map((tool, index) => (
                <motion.button
                  key={tool.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                    selectedTool.name === tool.name
                      ? 'bg-primary/10 border-l-4 border-primary'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedTool(tool)}
                >
                  <div className="text-2xl" style={{ color: tool.color }}>
                    {React.createElement(tool.icon)}
                  </div>
                  <div>
                    <h4 className="font-medium">{tool.name}</h4>
                    <p className="text-xs text-foreground/70">{tool.category}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tool Details */}
          <motion.div 
            className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            key={selectedTool.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl" style={{ color: selectedTool.color }}>
                {React.createElement(selectedTool.icon)}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{selectedTool.name}</h3>
                <p className="text-foreground/70">{selectedTool.category}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">How We Use It</h4>
              <p className="text-foreground/80">{selectedTool.description}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Use Cases</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedTool.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-foreground/80 italic">
            * We continuously update our toolkit to stay at the forefront of technology and deliver cutting-edge solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SoftwareToolsDetailed; 