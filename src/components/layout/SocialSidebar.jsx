import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const socialLinks = [
  // Added 'border' property to ensure hover effect works
  { label: 'GitHub', icon: FaGithub, url: 'https://github.com/TheRealLaksh', color: 'hover:text-green-400', border: 'hover:border-green-500' },
  { label: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com/in/laksh-pradhwani', color: 'hover:text-blue-400', border: 'hover:border-blue-500' },
  { label: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/_.lakshp', color: 'hover:text-pink-400', border: 'hover:border-pink-500' },
  { label: 'Email', icon: FaEnvelope, url: 'mailto:contact@lakshp.live', color: 'hover:text-rose-400', border: 'hover:border-rose-500' },
];

const SocialSidebar = () => {
  return (
    <div className="fixed bottom-10 left-8 hidden flex-col gap-4 z-40 md:flex">
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group flex items-center justify-start overflow-hidden
              w-12 h-12 hover:w-36 transition-all duration-500 ease-out
              bg-slate-900/80 rounded-full border border-transparent
              ${social.border} ${social.color} hover:bg-slate-900
            `}
          >
            {/* Removed 'border-slate-800' above and added 'border-transparent' as base */}

            {/* Icon fixed width container */}
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <Icon className="text-xl" />
            </div>
            
            {/* Text that reveals on expansion */}
            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium pl-1">
              {social.label}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialSidebar;