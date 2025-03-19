"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { FaSearch } from 'react-icons/fa';

// Project data
const projects = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    client: 'Fashion Retailer',
    year: '2023',
    image: '/images/portfolio/ecommerce.jpg',
    description: 'A modern e-commerce platform built with Next.js and Tailwind CSS, featuring product filtering, user accounts, and secure checkout.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Stripe', 'MongoDB']
  },
  {
    id: 'banking-app',
    title: 'Mobile Banking App',
    category: 'UI/UX Design',
    client: 'Financial Services Company',
    year: '2023',
    image: '/images/portfolio/banking.jpg',
    description: 'A user-friendly mobile banking application designed with a focus on accessibility and security, allowing users to manage their finances on the go.',
    tags: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'User Testing']
  },
  {
    id: 'product-photography',
    title: 'Product Photography',
    category: 'Photography',
    client: 'Luxury Goods Brand',
    year: '2022',
    image: '/images/portfolio/photography.jpg',
    description: 'Professional product photography for a luxury goods brand, showcasing their products in the best light with attention to detail and brand identity.',
    tags: ['Photography', 'Editing', 'Lighting', 'Composition']
  },
  {
    id: 'corporate-website',
    title: 'Corporate Website Redesign',
    category: 'Web Development',
    client: 'Investment Firm',
    year: '2022',
    image: '/images/portfolio/corporate.jpg',
    description: 'A complete redesign of a corporate website with a focus on modern design, improved user experience, and optimized performance.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'SEO', 'Performance']
  },
  {
    id: 'fitness-tracking-app',
    title: 'Fitness Tracking App',
    category: 'UI/UX Design',
    client: 'Health Tech Startup',
    year: '2023',
    image: '/images/portfolio/fitness.jpg',
    description: 'A comprehensive fitness tracking application designed to help users monitor their workouts, nutrition, and progress towards their fitness goals.',
    tags: ['Mobile Design', 'UI/UX', 'Wireframing', 'User Research']
  },
  {
    id: 'event-photography',
    title: 'Corporate Event Coverage',
    category: 'Photography',
    client: 'Tech Conference',
    year: '2022',
    image: '/images/portfolio/event.jpg',
    description: 'Professional photography services for a major tech conference, capturing keynote speakers, workshops, networking events, and the overall atmosphere.',
    tags: ['Event Photography', 'Editing', 'Storytelling']
  },
  {
    id: 'restaurant-website',
    title: 'Restaurant Website',
    category: 'Web Development',
    client: 'Fine Dining Restaurant',
    year: '2023',
    image: '/images/portfolio/restaurant.jpg',
    description: 'A visually appealing website for a fine dining restaurant, featuring an online reservation system, menu showcase, and chef profiles.',
    tags: ['JavaScript', 'HTML/CSS', 'Responsive Design', 'CMS']
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity Design',
    category: 'UI/UX Design',
    client: 'Sustainable Fashion Brand',
    year: '2022',
    image: '/images/portfolio/brand.jpg',
    description: 'A comprehensive brand identity design including logo, color palette, typography, and brand guidelines for a sustainable fashion brand.',
    tags: ['Branding', 'Logo Design', 'Typography', 'Color Theory']
  },
  {
    id: 'product-video',
    title: 'Product Launch Video',
    category: 'Video Production',
    client: 'Tech Gadget Company',
    year: '2023',
    image: '/images/portfolio/video.jpg',
    description: 'A high-quality product launch video showcasing the features and benefits of a new tech gadget, designed to generate excitement and drive sales.',
    tags: ['Video Production', 'Editing', 'Motion Graphics', 'Storytelling']
  },
  // New Digital Marketing projects
  {
    id: 'social-media-campaign',
    title: 'Social Media Marketing Campaign',
    category: 'Digital Marketing',
    client: 'Cosmetics Brand',
    year: '2023',
    image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Social+Media+Campaign',
    description: 'A comprehensive social media marketing campaign across Instagram, Facebook, and TikTok that increased brand awareness by 45% and drove a 30% increase in sales.',
    tags: ['Social Media', 'Content Strategy', 'Influencer Marketing', 'Analytics']
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing Automation',
    category: 'Digital Marketing',
    client: 'Online Education Platform',
    year: '2023',
    image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Email+Marketing',
    description: 'Designed and implemented an automated email marketing funnel that increased course enrollments by 60% and improved customer retention rates.',
    tags: ['Email Marketing', 'Automation', 'A/B Testing', 'Conversion Optimization']
  },
  {
    id: 'ppc-campaign',
    title: 'PPC Advertising Campaign',
    category: 'Digital Marketing',
    client: 'E-commerce Retailer',
    year: '2022',
    image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=PPC+Campaign',
    description: 'Managed a high-performance Google Ads and Facebook Ads campaign that achieved a 320% ROI and significantly reduced cost per acquisition.',
    tags: ['PPC', 'Google Ads', 'Facebook Ads', 'Conversion Tracking']
  },
  // New SEO projects
  {
    id: 'seo-optimization',
    title: 'SEO Website Optimization',
    category: 'SEO',
    client: 'Legal Services Firm',
    year: '2023',
    image: 'https://placehold.co/600x400/14b8a6/ffffff?text=SEO+Optimization',
    description: 'Comprehensive SEO optimization that improved organic search rankings, resulting in a 75% increase in organic traffic and 40% more leads within 6 months.',
    tags: ['On-page SEO', 'Technical SEO', 'Content Strategy', 'Keyword Research']
  },
  {
    id: 'local-seo',
    title: 'Local SEO Campaign',
    category: 'SEO',
    client: 'Restaurant Chain',
    year: '2022',
    image: 'https://placehold.co/600x400/14b8a6/ffffff?text=Local+SEO',
    description: 'Local SEO campaign that optimized Google My Business listings and local citations, resulting in top 3 map pack rankings for key locations and a 50% increase in foot traffic.',
    tags: ['Local SEO', 'Google My Business', 'Citation Building', 'Review Management']
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing Strategy',
    category: 'SEO',
    client: 'SaaS Company',
    year: '2023',
    image: 'https://placehold.co/600x400/14b8a6/ffffff?text=Content+Marketing',
    description: 'Developed and executed a comprehensive content marketing strategy that established thought leadership, improved domain authority, and generated a steady stream of inbound leads.',
    tags: ['Content Marketing', 'Blogging', 'Link Building', 'SEO']
  },
  // New AI Solutions project
  {
    id: 'ai-agent',
    title: 'Customer Service AI Agent',
    category: 'AI Solutions',
    client: 'Retail Chain',
    year: '2023',
    image: 'https://placehold.co/600x400/6366f1/ffffff?text=AI+Agent',
    description: 'An intelligent AI agent that handles customer inquiries 24/7, reducing response time by 80% and improving customer satisfaction scores by 35%.',
    tags: ['AI', 'Machine Learning', 'Natural Language Processing', 'Customer Service']
  },
  // New Software Development project
  {
    id: 'inventory-system',
    title: 'Inventory Management System',
    category: 'Software Development',
    client: 'Retail Chain',
    year: '2023',
    image: 'https://placehold.co/600x400/0891b2/ffffff?text=Inventory+System',
    description: 'A comprehensive inventory management system built in record time that streamlined operations and reduced costs by 35% for a retail chain.',
    tags: ['Software Development', 'Database Design', 'API Development', 'User Interface']
  }
];

// Categories for filtering
const categories = [
  'All',
  'Web Development',
  'UI/UX Design',
  'Photography',
  'Video Production',
  'Digital Marketing',
  'SEO',
  'Software Development'
];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Filter projects based on active category and search query
  useEffect(() => {
    let filtered = projects;
    
    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredProjects(filtered);
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-background py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="heading-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Portfolio
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-secondary mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore our latest projects and see how we&apos;ve helped our clients achieve their digital goals.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-background">
        <div className="container-custom">
          {/* Search Bar */}
          <motion.div
            className="mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>

          {/* Filter Categories */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-secondary hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <Link href={`/portfolio/${project.id}`}>
                  <div className="relative aspect-w-16 aspect-h-9">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </div>
                  <div className="p-6">
                    <span className="text-sm font-medium text-primary block mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-secondary text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-secondary px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs bg-gray-100 text-secondary px-2 py-1 rounded">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary">
                        {project.year}
                      </span>
                      <span className="text-primary text-sm font-medium">
                        View Project
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-secondary">
                We couldn&apos;t find any projects matching your search criteria. Please try a different search term or category.
              </p>
            </div>
          )}
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
              Ready to Start Your Project?
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

export default PortfolioPage; 