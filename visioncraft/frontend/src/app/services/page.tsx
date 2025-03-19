"use client";

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import Link from 'next/link';
import Image from 'next/image';
import { FaCode, FaPaintBrush, FaMobileAlt, FaCamera, FaVideo, FaArrowRight, FaLaptopCode } from 'react-icons/fa';
import SoftwareToolsDetailed from '@/components/services/SoftwareToolsDetailed';

// Service data
const services = [
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
    image: 'https://placehold.co/800x600/0891b2/ffffff?text=Software+Development'
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
    image: 'https://placehold.co/800x600/2563eb/ffffff?text=Web+Development'
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
    image: 'https://placehold.co/800x600/f59e0b/ffffff?text=UI/UX+Design'
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
    image: 'https://placehold.co/800x600/64748b/ffffff?text=Mobile+Apps'
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
    image: 'https://placehold.co/800x600/10b981/ffffff?text=Photography'
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
    image: 'https://placehold.co/800x600/ec4899/ffffff?text=Video+Production'
  }
];

const ServicesPage = () => {
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
              Our Services
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-secondary mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We offer a comprehensive range of digital services to help your business thrive in the digital landscape.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <Link href={`/services/${service.id}`}>
                  <div className="p-8">
                    <div className="flex justify-center mb-6">
                      <service.icon className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold text-center mb-4">{service.title}</h3>
                    <p className="text-secondary text-center mb-6">{service.shortDesc}</p>
                    <div className="flex justify-center">
                      <span className="inline-flex items-center text-primary font-medium">
                        Learn More <FaArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 mb-20 last:mb-0`}
            >
              <div className="w-full lg:w-1/2">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <service.icon className="h-8 w-8 text-primary mr-3" />
                  <h2 className="heading-md">{service.title}</h2>
                </div>
                <p className="text-secondary mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="self-start"
                >
                  <Link href={`/services/${service.id}`} className="btn-primary">
                    Explore {service.title}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Software Tools Section */}
      <SoftwareToolsDetailed />

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

export default ServicesPage; 