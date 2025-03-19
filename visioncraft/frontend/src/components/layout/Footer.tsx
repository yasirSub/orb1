"use client";

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-secondary/20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-primary">Vision</span>
              <span className="text-xl font-bold text-accent">Craft</span>
            </Link>
            <p className="text-secondary">
              Creating stunning digital experiences that drive results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-secondary hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-secondary hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-secondary hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/web-development" className="text-secondary hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/ui-ux-design" className="text-secondary hover:text-primary transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-apps" className="text-secondary hover:text-primary transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services/photography" className="text-secondary hover:text-primary transition-colors">
                  Photography
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-secondary">
              <li>123 Digital Street</li>
              <li>Tech City, TC 12345</li>
              <li>contact@orb1.com</li>
              <li>(555) 123-4567</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary/20 mt-8 pt-8 text-center text-secondary">
          <p>&copy; {new Date().getFullYear()} Orb1. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 