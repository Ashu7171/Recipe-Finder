import React from 'react'
import { motion } from 'framer-motion';

const Features = () => {
  return (
<section className="bg-white py-16 px-6 w-full">
        <motion.h2 
        whileInView={{opacity:1,y:0}} 
        initial={{opacity:0,y:100}}
        transition={{duration:1}}
        className="text-3xl font-bold text-center text-purple-800 mb-12">
          Why Use RecipeFinder?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <div className="text-center">
            <motion.span
            className="text-4xl text-purple-600">🥦</motion.span>

            <motion.h3 
            whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="text-xl font-semibold mt-4">Smart Ingredient Search</motion.h3>

            <motion.p 
            whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="mt-2 text-gray-600">
              Enter what’s in your fridge and get recipe ideas instantly.
            </motion.p>
          </div>

          <div className="text-center">
            <span className="text-4xl text-purple-600">🔥</span>
            <motion.h3 
            whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="text-xl font-semibold mt-4">Nutrient-Based Filters</motion.h3>

            <motion.p 
            whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="mt-2 text-gray-600">
              Looking for low-fat or high-protein? We’ve got you.
            </motion.p>
          </div>

          <div className="text-center">
            <span className="text-4xl text-purple-600">👨‍🍳</span>
            <motion.h3 
            whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="text-xl font-semibold mt-4">Healthy Choices</motion.h3>

            <motion.p whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="mt-2 text-gray-600">
              Explore meals that are both delicious and diet-friendly.
            </motion.p>
          </div>

          <div className="text-center">
            <span className="text-4xl text-purple-600">⚡</span>
            <motion.h3 
            whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="text-xl font-semibold mt-4">Powered by Spoonacular</motion.h3>

            <motion.p 
            whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="mt-2 text-gray-600">
              Fast and accurate recipes using a powerful API backend.
            </motion.p>
          </div>
        </div>
      </section>  )
}

export default Features