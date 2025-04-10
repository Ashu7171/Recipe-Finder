import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white w-full py-8 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left - Team Logo / Name */}
        <div className="text-2xl font-bold tracking-wide flex items-center gap-2">
          <span className="text-3xl">🚀</span> Team A3
        </div>

        {/* Center - Tagline */}
        <p className="text-center text-sm mt-4 md:mt-0">
          Building smart food solutions — one recipe at a time.
        </p>

        {/* Right - Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition">
            <FaGithub size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition">
            <FaLinkedin size={20} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>

      {/* Bottom - Copyright */}
      <div className="text-center text-xs text-gray-300 mt-6">
        © {new Date().getFullYear()} Team A3. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
