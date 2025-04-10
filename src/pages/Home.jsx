import React from "react";
import Dishes from "../components/Dishes";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Search from "../components/Search";
import Footer from "../components/Footer";

const Home = () => {
  
  return (
    <div className="flex flex-col items-center justify-center w-full">

      {/* 🎥 Hero Video Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 🚀 Search Options Section */}
      <Search />

      {/* 💡 Feature Highlights */}
      <Features />

      {/* 🍽️ Popular Dishes Section */}
      <Dishes />

      {/* 📊 Statistics Section */}
      <Stats />
        
      {/* 📚 Footer Section */}
      <Footer />

    </div>
  );
}

export default Home;
