"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://placehold.co/300x300/2563eb/ffffff?text=Sarah+J',
    bio: 'With over 15 years of experience in digital design and development, Sarah leads our team with vision and expertise.'
  },
  {
    name: 'Michael Chen',
    role: 'Creative Director',
    image: 'https://placehold.co/300x300/f59e0b/ffffff?text=Michael+C',
    bio: 'Michael brings his award-winning design background to create stunning visual experiences for our clients.'
  },
  {
    name: 'Jessica Patel',
    role: 'Lead Developer',
    image: 'https://placehold.co/300x300/64748b/ffffff?text=Jessica+P',
    bio: 'Jessica is a full-stack developer with a passion for clean code and innovative solutions.'
  },
  {
    name: 'David Wilson',
    role: 'Marketing Specialist',
    image: 'https://placehold.co/300x300/10b981/ffffff?text=David+W',
    bio: 'David helps our clients reach their target audience with strategic digital marketing campaigns.'
  }
];

const AboutPage = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-background py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-lg mb-6">About Orb1</h1>
            <p className="text-lg md:text-xl text-secondary mb-8">
              We&apos;re a team of passionate designers, developers, and creatives dedicated to building exceptional digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-md mb-6">Our Story</h2>
              <p className="text-secondary mb-4">
                Founded in 2018, Orb1 began with a simple mission: to help businesses succeed in the digital world by creating beautiful, functional, and user-friendly websites and applications.
              </p>
              <p className="text-secondary mb-4">
                What started as a small team of three has grown into a full-service digital agency with expertise in web development, UI/UX design, mobile applications, photography, and video production.
              </p>
              <p className="text-secondary">
                Today, we&apos;ve worked with over 100 clients across various industries, helping them transform their digital presence and achieve their business goals.
              </p>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://placehold.co/800x600/2563eb/ffffff?text=Our+Story"
                alt="Orb1 team working together"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4">Our Values</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              These core principles guide everything we do at Orb1.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-primary">Excellence</h3>
              <p className="text-secondary">
                We strive for excellence in every project, paying attention to the smallest details to deliver outstanding results.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-primary">Innovation</h3>
              <p className="text-secondary">
                We embrace new technologies and creative approaches to solve complex problems and create unique solutions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-primary">Collaboration</h3>
              <p className="text-secondary">
                We believe in working closely with our clients, treating their goals as our own and building lasting partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4">Meet Our Team</h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              The talented people behind Orb1&apos;s success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-secondary">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-md mb-6">Why Choose Orb1?</h2>
              <p className="text-secondary mb-6">
                We combine creativity, technical expertise, and business understanding to deliver digital solutions that not only look great but also drive results.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <p className="text-secondary">Experienced team of designers and developers</p>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <p className="text-secondary">Custom solutions tailored to your specific needs</p>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <p className="text-secondary">Collaborative approach with clear communication</p>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <p className="text-secondary">Focus on delivering measurable results</p>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <p className="text-secondary">Ongoing support and maintenance</p>
                </li>
              </ul>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://placehold.co/800x600/2563eb/ffffff?text=Why+Choose+Us"
                alt="Orb1 workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-custom">
          <div className="text-center text-white">
            <h2 className="heading-md mb-4">Ready to Work With Us?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Let&apos;s create something amazing together. Contact us today to discuss your project.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 