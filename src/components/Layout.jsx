import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-white text-gray-800">
      {/* 📌 Navbar on top */}
      <Navbar />

      {/* 🎨 Optional subtle BG pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full 
        [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      </div>

      {/* 💻 Page content */}
      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default Layout;
