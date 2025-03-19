"use client";

// Project data types
export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  image: string;
  images: string[];
  client: string;
  date: string;
  technologies: string[];
  features: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  link?: string;
}

// Project categories
export const projectCategories = [
  "All",
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "E-commerce",
  "AI Solutions",
  "Photography",
  "3D Modeling",
  "Video Production"
];

// Dummy project data
export const projects: Project[] = [
  {
    id: "eco-commerce-platform",
    title: "EcoCommerce Platform",
    shortDescription: "A sustainable e-commerce platform with carbon footprint tracking",
    description: "EcoCommerce is a revolutionary e-commerce platform focused on sustainable products. The platform includes features like carbon footprint tracking for each purchase, sustainable packaging options, and a reward system for eco-friendly choices. We developed the entire platform from concept to deployment, including custom inventory management and integration with sustainable shipping providers.",
    category: "E-commerce",
    image: "/images/projects/ecocommerce-main.jpg",
    images: [
      "/images/projects/ecocommerce-1.jpg",
      "/images/projects/ecocommerce-2.jpg",
      "/images/projects/ecocommerce-3.jpg",
    ],
    client: "GreenLife Retail",
    date: "June 2023",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Stripe", "AWS"],
    features: [
      "Carbon footprint calculator",
      "Sustainable product verification",
      "Eco-friendly packaging options",
      "Green shipping integrations",
      "Customer sustainability dashboard",
      "Reward system for eco-friendly choices"
    ],
    testimonial: {
      quote: "Orb1 transformed our business with their innovative approach to sustainable e-commerce. The carbon footprint tracking feature has been a game-changer for our customers.",
      author: "Sarah Johnson",
      position: "CEO, GreenLife Retail"
    },
    link: "https://ecocommerce-example.com"
  },
  {
    id: "medconnect-app",
    title: "MedConnect Mobile App",
    shortDescription: "Telemedicine app connecting patients with healthcare providers",
    description: "MedConnect is a comprehensive telemedicine application that connects patients with healthcare providers for virtual consultations. The app features secure video conferencing, electronic health records, prescription management, and appointment scheduling. We developed both iOS and Android versions using React Native, ensuring a consistent experience across platforms while maintaining high performance and security standards for sensitive medical data.",
    category: "Mobile Apps",
    image: "/images/projects/medconnect-main.jpg",
    images: [
      "/images/projects/medconnect-1.jpg",
      "/images/projects/medconnect-2.jpg",
      "/images/projects/medconnect-3.jpg",
    ],
    client: "HealthTech Solutions",
    date: "March 2023",
    technologies: ["React Native", "Firebase", "Node.js", "Express", "MongoDB", "WebRTC"],
    features: [
      "Secure video consultations",
      "Electronic health records",
      "Prescription management",
      "Appointment scheduling",
      "Payment processing",
      "HIPAA compliance",
      "Push notifications"
    ],
    testimonial: {
      quote: "The MedConnect app has revolutionized how we deliver healthcare. Orb1's attention to security and user experience resulted in an app that both our providers and patients love using.",
      author: "Dr. Michael Chen",
      position: "CTO, HealthTech Solutions"
    },
    link: "https://medconnect-example.com"
  },
  {
    id: "urban-spaces-3d",
    title: "Urban Spaces 3D Visualization",
    shortDescription: "Architectural visualization for urban planning project",
    description: "Urban Spaces is a 3D visualization project for a major city planning initiative. We created detailed 3D models of proposed urban developments, including buildings, parks, and infrastructure. The project included interactive elements allowing stakeholders to explore different design scenarios and their impact on the urban landscape. Our work helped secure approval for the development by effectively communicating the vision to city officials and the public.",
    category: "3D Modeling",
    image: "/images/projects/urbanspaces-main.jpg",
    images: [
      "/images/projects/urbanspaces-1.jpg",
      "/images/projects/urbanspaces-2.jpg",
      "/images/projects/urbanspaces-3.jpg",
    ],
    client: "Metropolitan Development Authority",
    date: "November 2022",
    technologies: ["Blender", "Cinema 4D", "Unreal Engine", "Adobe After Effects", "WebGL"],
    features: [
      "Photorealistic 3D renderings",
      "Interactive visualization platform",
      "Virtual reality tours",
      "Environmental impact simulations",
      "Time-of-day lighting scenarios",
      "Traffic flow simulations"
    ],
    testimonial: {
      quote: "The 3D visualizations created by Orb1 were instrumental in helping us communicate our vision to stakeholders. The level of detail and realism exceeded our expectations.",
      author: "Robert Martinez",
      position: "Urban Planning Director"
    }
  },
  {
    id: "culinary-delight-photography",
    title: "Culinary Delight Photography",
    shortDescription: "Food photography for upscale restaurant chain",
    description: "We provided comprehensive food photography services for an upscale restaurant chain's menu redesign and marketing campaign. The project involved capturing the essence of their signature dishes with meticulous attention to styling, lighting, and composition. Our work included both studio and on-location shoots, resulting in a cohesive visual identity that highlighted the quality and artistry of their culinary offerings across their website, menus, and social media platforms.",
    category: "Photography",
    image: "/images/projects/culinary-main.jpg",
    images: [
      "/images/projects/culinary-1.jpg",
      "/images/projects/culinary-2.jpg",
      "/images/projects/culinary-3.jpg",
    ],
    client: "Fusion Bistro Group",
    date: "April 2023",
    technologies: ["Adobe Photoshop", "Adobe Lightroom", "Professional Lighting", "Food Styling"],
    features: [
      "Menu item photography",
      "Ambiance and interior shots",
      "Chef portraits",
      "Preparation process documentation",
      "Seasonal campaign imagery",
      "Social media content creation"
    ],
    testimonial: {
      quote: "Orb1's photography captured the essence of our culinary creations perfectly. The images have significantly enhanced our brand perception and customer engagement across all platforms.",
      author: "Chef Antonio Rossi",
      position: "Executive Chef, Fusion Bistro Group"
    }
  },
  {
    id: "fintech-dashboard",
    title: "FinTech Analytics Dashboard",
    shortDescription: "Comprehensive financial analytics platform with intuitive UI",
    description: "We designed and developed a sophisticated financial analytics dashboard for investment professionals. The platform features real-time data visualization, portfolio performance tracking, risk assessment tools, and customizable reporting. Our focus on user experience resulted in an intuitive interface that simplifies complex financial data, allowing users to make informed investment decisions quickly. The responsive design ensures a seamless experience across desktop and mobile devices.",
    category: "UI/UX Design",
    image: "/images/projects/fintech-main.jpg",
    images: [
      "/images/projects/fintech-1.jpg",
      "/images/projects/fintech-2.jpg",
      "/images/projects/fintech-3.jpg",
    ],
    client: "InvestPro Financial",
    date: "January 2023",
    technologies: ["Figma", "React", "D3.js", "TypeScript", "Material UI", "Firebase"],
    features: [
      "Real-time data visualization",
      "Portfolio performance tracking",
      "Risk assessment tools",
      "Customizable dashboards",
      "Automated reporting",
      "Dark/light mode",
      "Mobile responsiveness"
    ],
    testimonial: {
      quote: "The dashboard Orb1 created has transformed how our clients interact with financial data. The intuitive design makes complex information accessible, and the attention to detail in the UI has set a new standard for our industry.",
      author: "David Morgan",
      position: "Product Director, InvestPro Financial"
    },
    link: "https://investpro-dashboard.example.com"
  },
  {
    id: "eco-tourism-video",
    title: "Eco-Tourism Promotional Video",
    shortDescription: "Cinematic promotional video for sustainable tourism destination",
    description: "We produced a cinematic promotional video for an eco-tourism destination, showcasing its natural beauty and sustainable practices. The project included aerial cinematography, underwater footage, and intimate portraits of local communities and wildlife. Our comprehensive approach covered scriptwriting, storyboarding, filming, editing, sound design, and color grading. The resulting video effectively communicated the destination's commitment to conservation while inspiring viewers to experience its unique offerings.",
    category: "Video Production",
    image: "/images/projects/ecotourism-main.jpg",
    images: [
      "/images/projects/ecotourism-1.jpg",
      "/images/projects/ecotourism-2.jpg",
      "/images/projects/ecotourism-3.jpg",
    ],
    client: "Verde Island Resort",
    date: "May 2023",
    technologies: ["Adobe Premiere Pro", "Adobe After Effects", "DaVinci Resolve", "Drone Cinematography"],
    features: [
      "Aerial cinematography",
      "Underwater footage",
      "Wildlife sequences",
      "Local community stories",
      "Sustainable practices showcase",
      "Original soundtrack",
      "Multi-platform optimization"
    ],
    testimonial: {
      quote: "The video produced by VisionCraft perfectly captured the essence of our eco-resort. Their storytelling approach highlighted our commitment to sustainability while showcasing the beauty of our location. Bookings increased by 40% following the campaign launch.",
      author: "Elena Rodriguez",
      position: "Marketing Director, Verde Island Resort"
    },
    link: "https://vimeo.com/example/ecotourism"
  },
  {
    id: "smart-home-app",
    title: "SmartLiving Home Automation App",
    shortDescription: "IoT control app for smart home devices with voice commands",
    description: "SmartLiving is a comprehensive home automation application that allows users to control all their smart home devices from a single interface. We developed the mobile app for iOS and Android, along with the backend infrastructure to handle device communication. The app features intuitive controls, automation routines, energy usage monitoring, and voice command integration. Security was a primary focus, with end-to-end encryption and multi-factor authentication protecting user data and home access.",
    category: "Mobile Apps",
    image: "/images/projects/smarthome-main.jpg",
    images: [
      "/images/projects/smarthome-1.jpg",
      "/images/projects/smarthome-2.jpg",
      "/images/projects/smarthome-3.jpg",
    ],
    client: "ConnectedHome Technologies",
    date: "October 2022",
    technologies: ["React Native", "Node.js", "MQTT", "AWS IoT", "Firebase", "Voice Recognition API"],
    features: [
      "Universal device control",
      "Voice command integration",
      "Automation routines",
      "Energy usage monitoring",
      "Geofencing capabilities",
      "Security camera feeds",
      "Remote access"
    ],
    testimonial: {
      quote: "VisionCraft delivered an exceptional app that has become the cornerstone of our smart home ecosystem. Their expertise in IoT and mobile development resulted in a secure, intuitive platform that our customers love.",
      author: "Thomas Wright",
      position: "CEO, ConnectedHome Technologies"
    },
    link: "https://smartliving-app.example.com"
  }
];

// Function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === "All") {
    return projects;
  }
  return projects.filter(project => project.category === category);
};

// Function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

// Function to get related projects
export const getRelatedProjects = (currentId: string, category: string, limit: number = 3): Project[] => {
  // First get projects with the same category, excluding the current one
  let related = projects.filter(project => project.category === category && project.id !== currentId);
  
  // If we don't have enough, add some random projects from other categories
  if (related.length < limit) {
    const otherProjects = projects.filter(project => project.category !== category && project.id !== currentId);
    const randomProjects = otherProjects.sort(() => 0.5 - Math.random()).slice(0, limit - related.length);
    related = [...related, ...randomProjects];
  }
  
  // Return only the requested number of projects
  return related.slice(0, limit);
}; 