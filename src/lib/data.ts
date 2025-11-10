import { StaticImageData } from "next/image";
import { Images } from "./images";

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: StaticImageData;
  videoUrl?: string;
  githubUrl: string;
  tools: string[];
  category: string;
  slug: string;
  projectStartDate: Date;
  projectStatus: string;
  liveDemoUrl?: string;
  keyFeatures?: string[];
  galleryImages?: StaticImageData[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company?: string;
  avatarUrl?: StaticImageData;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
}

// Projects data is now fetched from GitHub in ProjectsSection.tsx
export const projectsData: Project[] = [];

// Testimonials section is removed
export const testimonialsData: Testimonial[] = [];

export const workExperiencesData: WorkExperience[] = [
  {
    id: "3",
    company: "Unified Mentor",
    role: "Full stack Web Developer",
    startDate: "Oct 2025",
    endDate: "Dec 2025",
    description: "Completed an intensive 3-month, stipendiary MERN stack internship at Unified Mentor, developing a portfolio of full-stack web applications. I progressed from foundational HTML/CSS and advanced JavaScript to building complex, component-based UIs with React and React Hooks. The program emphasized practical application, including managing global state with Redux and deploying responsive, data-driven projects. This culminated in the final submission of several applications, such as a social media platform and an e-commerce site, all version-controlled with Git.",
    responsibilities: [
      "Built dynamic, component-based user interfaces using React and React Hooks.",
      "Implemented global state management for complex applications using Redux.",
      "Developed and structured full-stack projects like a social media app and an e-commerce platform.",
      "Mastered advanced JavaScript (ES6+), including asynchronous operations and DOM manipulation.",
      "Managed project version control with Git and deployed finalized applications to platforms like Netlify/Vercel."
    ],
  },
  {
    id: "2",
    company: "MoreYeahs",
    role: "Web Developer",
    startDate: "Aug 2025",
    endDate: "Sep 2025",
    description: "Developed a full-stack gig platform using Django and Python. I built REST APIs for user authentication with distinct roles (Seeker/Provider) and full CRUD functionality for gig listings. I also created a dynamic frontend with HTML/CSS, featuring personalized dashboards and a 'favorites' system. The project involved environment configuration for security and final submission on GitHub.",
    responsibilities: [
      "Built RESTful APIs for user authentication (Seeker/Provider roles).",
      "Implemented full CRUD functionality for gig listings.",
      "Created a dynamic frontend with HTML/CSS and personalized dashboards.",
      "Engineered a 'favorites' system for users.",
      "Managed environment configuration for security."
    ],
  },
  {
    id: "1",
    company: "Hotel Kavana",
    role: "Information Technology Department",
    startDate: "Jun 2025",
    endDate: "Jun 2025",
    description: "Gained hands-on experience in the IT department of a hospitality business. My responsibilities included shadowing senior IT staff, learning principles of hotel management software, and assisting with data management tasks. This internship provided practical insight into how technology supports critical business operations, including guest services, reservations, and internal record-keeping, all within a fast-paced, real-world environment.",
    responsibilities: [
      "Assisted with data management and record-keeping tasks.",
      "Learned core principles of hotel management software.",
      "Observed and supported senior IT staff in daily operations.",
      "Gained insight into technology's role in guest services and reservations."
    ],
  }
];