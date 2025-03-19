"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';
import { useParams } from 'next/navigation';
import { FaCode, FaPaintBrush, FaMobileAlt, FaCamera, FaVideo, FaArrowRight, FaCheck, FaRobot, FaLaptopCode } from 'react-icons/fa';

// Service data types
interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface Worker {
  name: string;
  role: string;
  image: string;
  description: string;
  skills: string[];
}

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDesc: string;
  description: string;
  features: string[];
  image: string;
  cta: string;
  projects: Project[];
  workers: Worker[];
  category: string;
}

// Service data
const services = [
  {
    id: 'ai-solutions',
    icon: FaRobot,
    title: 'AI Solutions',
    shortDesc: 'Cutting-edge artificial intelligence solutions to transform your business.',
    description: 'We leverage the latest advancements in artificial intelligence to create innovative solutions that automate processes, provide insights, and enhance decision-making. Our AI experts can develop custom AI agents, machine learning models, and intelligent systems tailored to your specific business needs.',
    features: [
      'Custom AI agents and assistants',
      'Machine learning model development',
      'Natural language processing solutions',
      'Computer vision applications',
      'Predictive analytics systems',
      'AI integration with existing platforms'
    ],
    image: 'https://placehold.co/800x600/6366f1/ffffff?text=AI+Solutions',
    cta: 'Start Your AI Project',
    projects: [
      {
        title: 'Customer Service AI Agent',
        description: 'An intelligent AI agent that handles customer inquiries 24/7, reducing response time by 80% and improving customer satisfaction.',
        image: 'https://placehold.co/600x400/6366f1/ffffff?text=AI+Agent',
        link: '/portfolio/ai-agent'
      },
      {
        title: 'Predictive Analytics Dashboard',
        description: 'A machine learning-powered dashboard that analyzes business data to predict trends and provide actionable insights for decision-makers.',
        image: 'https://placehold.co/600x400/6366f1/ffffff?text=Predictive+Analytics',
        link: '/portfolio/predictive-analytics'
      },
      {
        title: 'Computer Vision Product Inspector',
        description: 'An AI system that uses computer vision to automatically detect defects in manufacturing, improving quality control efficiency by 95%.',
        image: 'https://placehold.co/600x400/6366f1/ffffff?text=Computer+Vision',
        link: '/portfolio/computer-vision'
      }
    ],
    workers: [
      {
        name: 'Dr. Maya Patel',
        role: 'AI Research Lead',
        image: 'https://placehold.co/300x300/6366f1/ffffff?text=Maya+P',
        description: 'Dr. Patel has a Ph.D. in Machine Learning and leads our AI research initiatives. She specializes in developing cutting-edge AI models that solve complex business problems.',
        skills: ['Machine Learning', 'Neural Networks', 'NLP', 'Computer Vision', 'TensorFlow']
      },
      {
        name: 'Jamal Washington',
        role: 'AI Solutions Architect',
        image: 'https://placehold.co/300x300/6366f1/ffffff?text=Jamal+W',
        description: 'Jamal bridges the gap between theoretical AI and practical business applications. He designs scalable AI systems that integrate seamlessly with existing infrastructure.',
        skills: ['AI System Design', 'Cloud AI', 'MLOps', 'Python', 'Data Engineering']
      }
    ],
    category: 'AI Solutions'
  },
  {
    id: 'software-development',
    icon: FaLaptopCode,
    title: 'Software Development',
    shortDesc: 'Custom software solutions built rapidly and within your budget.',
    description: 'Our software development team excels at creating high-quality, scalable software solutions in record time. We pride ourselves on delivering complex projects efficiently and within budget constraints without compromising on quality or performance.',
    features: [
      'Rapid application development',
      'Budget-friendly solutions',
      'Custom enterprise software',
      'Legacy system modernization',
      'Cloud-native applications',
      'DevOps and continuous integration'
    ],
    image: 'https://placehold.co/800x600/0891b2/ffffff?text=Software+Development',
    cta: 'Start Your Software Project',
    projects: [
      {
        title: 'Inventory Management System',
        description: 'A comprehensive inventory management system built in record time that streamlined operations and reduced costs by 35% for a retail chain.',
        image: 'https://placehold.co/600x400/0891b2/ffffff?text=Inventory+System',
        link: '/portfolio/inventory-system'
      },
      {
        title: 'Healthcare Patient Portal',
        description: 'A secure, HIPAA-compliant patient portal that allows patients to access medical records, schedule appointments, and communicate with healthcare providers.',
        image: 'https://placehold.co/600x400/0891b2/ffffff?text=Patient+Portal',
        link: '/portfolio/patient-portal'
      },
      {
        title: 'Financial Analytics Platform',
        description: 'A budget-friendly yet powerful financial analytics platform that provides real-time insights and reporting for small to medium businesses.',
        image: 'https://placehold.co/600x400/0891b2/ffffff?text=Financial+Platform',
        link: '/portfolio/financial-platform'
      }
    ],
    workers: [
      {
        name: 'Carlos Rodriguez',
        role: 'Lead Software Architect',
        image: 'https://placehold.co/300x300/0891b2/ffffff?text=Carlos+R',
        description: 'Carlos is known for his ability to design and implement complex software systems in record time. He specializes in creating efficient, scalable architectures that meet business needs.',
        skills: ['System Architecture', 'Java', 'C#', 'Microservices', 'Cloud Infrastructure']
      },
      {
        name: 'Lisa Kim',
        role: 'Full-Stack Developer',
        image: 'https://placehold.co/300x300/0891b2/ffffff?text=Lisa+K',
        description: 'Lisa is our rapid development expert who can build full-featured applications from concept to deployment in record time without sacrificing quality or performance.',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'DevOps']
      }
    ],
    category: 'Software Development'
  },
  {
    id: 'web-development',
    icon: FaCode,
    title: 'Web Development',
    shortDesc: 'Custom websites and web applications built with modern technologies.',
    description: 'Our web development team creates custom, responsive websites and web applications that are tailored to your specific business needs. We use the latest technologies and frameworks to ensure your website is fast, secure, and scalable.',
    features: [
      'Custom website design and development',
      'E-commerce solutions',
      'Content management systems',
      'Web application development',
      'API development and integration',
      'Website maintenance and support'
    ],
    image: 'https://placehold.co/800x600/2563eb/ffffff?text=Web+Development',
    cta: 'Start Your Web Project',
    projects: [
      {
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce platform built with Next.js and Tailwind CSS, featuring product filtering, user accounts, and secure checkout.',
        image: 'https://placehold.co/600x400/2563eb/ffffff?text=E-Commerce+Platform',
        link: '/portfolio/ecommerce-platform'
      },
      {
        title: 'Corporate Website Redesign',
        description: 'A complete redesign of a corporate website with a focus on modern design, improved user experience, and optimized performance.',
        image: 'https://placehold.co/600x400/2563eb/ffffff?text=Corporate+Website',
        link: '/portfolio/corporate-website'
      },
      {
        title: 'Restaurant Website',
        description: 'A visually appealing website for a fine dining restaurant, featuring an online reservation system, menu showcase, and chef profiles.',
        image: 'https://placehold.co/600x400/2563eb/ffffff?text=Restaurant+Website',
        link: '/portfolio/restaurant-website'
      }
    ],
    workers: [
      {
        name: 'Alex Johnson',
        role: 'Senior Web Developer',
        image: 'https://placehold.co/300x300/2563eb/ffffff?text=Alex+J',
        description: 'Alex specializes in frontend development with React and Next.js. With 8 years of experience, he has built numerous high-performance web applications.',
        skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL']
      },
      {
        name: 'Sarah Chen',
        role: 'Backend Developer',
        image: 'https://placehold.co/300x300/2563eb/ffffff?text=Sarah+C',
        description: 'Sarah is our backend expert with deep knowledge of database design, API development, and server architecture. She ensures our applications are robust and scalable.',
        skills: ['Python', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS']
      }
    ],
    category: 'Web Development'
  },
  {
    id: 'ui-ux-design',
    icon: FaPaintBrush,
    title: 'UI/UX Design',
    shortDesc: 'Beautiful and intuitive user interfaces that deliver exceptional experiences.',
    description: 'Our design team creates beautiful, intuitive user interfaces that provide exceptional user experiences. We focus on understanding your users&apos; needs and creating designs that are both visually appealing and functional.',
    features: [
      'User research and analysis',
      'Wireframing and prototyping',
      'User interface design',
      'User experience optimization',
      'Design systems',
      'Usability testing'
    ],
    image: 'https://placehold.co/800x600/f59e0b/ffffff?text=UI/UX+Design',
    cta: 'Improve Your User Experience',
    projects: [
      {
        title: 'Mobile Banking App',
        description: 'A user-friendly mobile banking application designed with a focus on accessibility and security, allowing users to manage their finances on the go.',
        image: 'https://placehold.co/600x400/f59e0b/ffffff?text=Mobile+Banking+App',
        link: '/portfolio/banking-app'
      },
      {
        title: 'Fitness Tracking App',
        description: 'A comprehensive fitness tracking application designed to help users monitor their workouts, nutrition, and progress towards their fitness goals.',
        image: 'https://placehold.co/600x400/f59e0b/ffffff?text=Fitness+App',
        link: '/portfolio/mobile-app-design'
      },
      {
        title: 'Brand Identity Design',
        description: 'A comprehensive brand identity design including logo, color palette, typography, and brand guidelines for a sustainable fashion brand.',
        image: 'https://placehold.co/600x400/f59e0b/ffffff?text=Brand+Identity',
        link: '/portfolio/brand-identity'
      }
    ],
    workers: [
      {
        name: 'Emily Rodriguez',
        role: 'Lead UI/UX Designer',
        image: 'https://placehold.co/300x300/f59e0b/ffffff?text=Emily+R',
        description: 'Emily leads our design team with her exceptional eye for detail and deep understanding of user behavior. She transforms complex requirements into intuitive interfaces.',
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems']
      },
      {
        name: 'David Kim',
        role: 'UX Researcher',
        image: 'https://placehold.co/300x300/f59e0b/ffffff?text=David+K',
        description: 'David specializes in user research and testing. He gathers valuable insights about user behavior and preferences to inform our design decisions.',
        skills: ['User Interviews', 'Usability Testing', 'Data Analysis', 'Journey Mapping', 'Wireframing']
      }
    ],
    category: 'UI/UX Design'
  },
  {
    id: 'mobile-apps',
    icon: FaMobileAlt,
    title: 'Mobile Apps',
    shortDesc: 'Native and cross-platform mobile applications for iOS and Android.',
    description: 'We develop high-quality mobile applications for iOS and Android platforms. Whether you need a native app for a specific platform or a cross-platform solution, our team has the expertise to bring your mobile app idea to life.',
    features: [
      'iOS app development',
      'Android app development',
      'Cross-platform app development',
      'Mobile app UI/UX design',
      'App store optimization',
      'App maintenance and updates'
    ],
    image: 'https://placehold.co/800x600/64748b/ffffff?text=Mobile+Apps',
    cta: 'Build Your Mobile App',
    projects: [
      {
        title: 'Food Delivery App',
        description: 'A comprehensive food delivery application with real-time tracking, payment integration, and restaurant management features.',
        image: 'https://placehold.co/600x400/64748b/ffffff?text=Food+Delivery+App',
        link: '/portfolio/food-delivery-app'
      },
      {
        title: 'Travel Companion App',
        description: 'A travel app that helps users plan trips, discover local attractions, and navigate unfamiliar cities with offline maps and guides.',
        image: 'https://placehold.co/600x400/64748b/ffffff?text=Travel+App',
        link: '/portfolio/travel-app'
      },
      {
        title: 'Healthcare Monitoring App',
        description: 'A healthcare app that allows patients to track vital signs, medication schedules, and communicate with healthcare providers.',
        image: 'https://placehold.co/600x400/64748b/ffffff?text=Healthcare+App',
        link: '/portfolio/healthcare-app'
      }
    ],
    workers: [
      {
        name: 'Michael Zhang',
        role: 'Mobile App Developer',
        image: 'https://placehold.co/300x300/64748b/ffffff?text=Michael+Z',
        description: 'Michael is our mobile development expert with extensive experience in both iOS and Android platforms. He creates seamless, high-performance mobile applications.',
        skills: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase']
      },
      {
        name: 'Priya Patel',
        role: 'Mobile UI Designer',
        image: 'https://placehold.co/300x300/64748b/ffffff?text=Priya+P',
        description: 'Priya specializes in creating beautiful and intuitive mobile interfaces that follow platform guidelines while maintaining brand consistency.',
        skills: ['Mobile UI Design', 'Prototyping', 'Animation', 'Design Systems', 'User Testing']
      }
    ],
    category: 'Mobile Apps'
  },
  {
    id: 'photography',
    icon: FaCamera,
    title: 'Photography',
    shortDesc: 'Professional photography services for products and events.',
    description: 'Our professional photography services capture the essence of your products, events, and brand. We provide high-quality images that can be used for your website, marketing materials, social media, and more.',
    features: [
      'Product photography',
      'Corporate event photography',
      'Brand photography',
      'Architectural photography',
      'Photo editing and retouching',
      'Commercial photography'
    ],
    image: 'https://placehold.co/800x600/10b981/ffffff?text=Photography',
    cta: 'Capture Your Vision',
    projects: [
      {
        title: 'Product Photography',
        description: 'Professional product photography for a luxury goods brand, showcasing their products in the best light with attention to detail and brand identity.',
        image: 'https://placehold.co/600x400/10b981/ffffff?text=Product+Photography',
        link: '/portfolio/product-photography'
      },
      {
        title: 'Corporate Event Coverage',
        description: 'Professional photography services for a major tech conference, capturing keynote speakers, workshops, networking events, and the overall atmosphere.',
        image: 'https://placehold.co/600x400/10b981/ffffff?text=Event+Photography',
        link: '/portfolio/event-photography'
      },
      {
        title: 'Architectural Photography',
        description: 'Stunning architectural photography showcasing modern buildings and interior designs with perfect lighting and composition.',
        image: 'https://placehold.co/600x400/10b981/ffffff?text=Architectural+Photography',
        link: '/portfolio/architectural-photography'
      }
    ],
    workers: [
      {
        name: 'Thomas Wilson',
        role: 'Lead Photographer',
        image: 'https://placehold.co/300x300/10b981/ffffff?text=Thomas+W',
        description: 'Thomas is our lead photographer with over 15 years of experience in commercial and product photography. His attention to detail and lighting expertise produces stunning images.',
        skills: ['Product Photography', 'Lighting', 'Composition', 'Retouching', 'Studio Setup']
      },
      {
        name: 'Olivia Martinez',
        role: 'Event Photographer',
        image: 'https://placehold.co/300x300/10b981/ffffff?text=Olivia+M',
        description: 'Olivia specializes in event photography, capturing candid moments and the energy of corporate events, conferences, and product launches.',
        skills: ['Event Photography', 'Candid Shots', 'Photojournalism', 'Editing', 'Quick Turnaround']
      }
    ],
    category: 'Photography'
  },
  {
    id: 'video-production',
    icon: FaVideo,
    title: 'Video Production',
    shortDesc: 'High-quality video production and editing services.',
    description: 'Our video production team creates engaging, high-quality videos that tell your story and showcase your brand. From concept to final edit, we handle all aspects of video production to deliver content that resonates with your audience.',
    features: [
      'Corporate videos',
      'Product demonstrations',
      'Promotional videos',
      'Event coverage',
      'Animation and motion graphics',
      'Video editing and post-production'
    ],
    image: 'https://placehold.co/800x600/ec4899/ffffff?text=Video+Production',
    cta: 'Create Your Video',
    projects: [
      {
        title: 'Product Launch Video',
        description: 'A high-quality product launch video showcasing the features and benefits of a new tech gadget, designed to generate excitement and drive sales.',
        image: 'https://placehold.co/600x400/ec4899/ffffff?text=Product+Launch+Video',
        link: '/portfolio/product-video'
      },
      {
        title: 'Corporate Brand Video',
        description: 'An engaging corporate brand video that tells the story of a company, its values, and its mission in a compelling and authentic way.',
        image: 'https://placehold.co/600x400/ec4899/ffffff?text=Brand+Video',
        link: '/portfolio/brand-video'
      },
      {
        title: 'Animated Explainer Video',
        description: 'A concise and engaging animated explainer video that breaks down complex concepts into simple, easy-to-understand visuals.',
        image: 'https://placehold.co/600x400/ec4899/ffffff?text=Explainer+Video',
        link: '/portfolio/explainer-video'
      }
    ],
    workers: [
      {
        name: 'James Anderson',
        role: 'Video Director',
        image: 'https://placehold.co/300x300/ec4899/ffffff?text=James+A',
        description: 'James leads our video production team with his creative vision and storytelling expertise. He transforms concepts into compelling visual narratives.',
        skills: ['Directing', 'Storyboarding', 'Cinematography', 'Editing', 'Color Grading']
      },
      {
        name: 'Sophia Lee',
        role: 'Motion Graphics Designer',
        image: 'https://placehold.co/300x300/ec4899/ffffff?text=Sophia+L',
        description: 'Sophia specializes in creating stunning motion graphics and animations that enhance our videos with visual explanations and brand elements.',
        skills: ['After Effects', 'Cinema 4D', '2D Animation', '3D Animation', 'Visual Effects']
      }
    ],
    category: 'Video Production'
  }
];

const ServiceDetailPage = () => {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the service based on the ID from the URL
    const serviceId = params.id as string;
    const foundService = services.find(s => s.id === serviceId);
    
    if (foundService) {
      setService(foundService);
    }
    
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="heading-md mb-4">Service Not Found</h1>
        <p className="text-secondary mb-8">The service you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/services" className="btn-primary">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-background py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block">
                <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              </span>
              <h1 className="heading-lg mb-6">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-secondary mb-8">
                {service.description}
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact" className="btn-primary">
                  {service.cta}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-md mb-4">What We Offer</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Our comprehensive {service.title.toLowerCase()} services are designed to meet your specific needs and help you achieve your goals.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {service.features.map((feature: string, index: number) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-2">{feature}</h3>
                    <p className="text-secondary">
                      We provide expert {feature.toLowerCase()} services tailored to your specific requirements and industry standards.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-md mb-4">Our {service.title} Projects</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Take a look at some of our recent {service.title.toLowerCase()} projects that showcase our expertise and creativity.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {service.projects.map((project: Project, index: number) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <Link href={project.link}>
                  <div className="relative aspect-w-16 aspect-h-9">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-secondary text-sm mb-4">{project.description}</p>
                    <div className="flex items-center text-primary font-medium">
                      <span>View Project</span>
                      <FaArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-md mb-4">Meet Our {service.title} Team</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Our talented professionals bring years of experience and passion to every project.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {service.workers.map((worker: Worker, index: number) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                    <Image
                      src={worker.image}
                      alt={worker.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-1">{worker.name}</h3>
                  <p className="text-primary font-medium mb-3">{worker.role}</p>
                  <p className="text-secondary mb-4">{worker.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {worker.skills.map((skill: string, i: number) => (
                      <span key={i} className="text-xs bg-gray-100 text-secondary px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-custom">
          <div className="text-center text-white">
            <motion.h2 
              className="heading-md mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Start Your {service.title} Project?
            </motion.h2>
            <motion.p 
              className="text-lg opacity-90 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let&apos;s discuss your ideas and turn them into reality. Our team is ready to help you create something amazing.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact"
                className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage; 