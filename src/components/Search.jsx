import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Search = () => {
  return (
    <section className="py-12 px-6 text-center bg-white w-full">
        <motion.h2 
        whileInView={{opacity:1,y:0}} 
        initial={{opacity:0,y:100}}
        transition={{duration:1,delay:1}}
        className="text-3xl font-semibold mb-4 text-purple-800">
          Find Recipes Smartly
        </motion.h2>

        <motion.p 
        whileInView={{opacity:1,y:0}} 
        initial={{opacity:0,y:100}}
        transition={{duration:1.5,delay:1}}
        className="text-lg mb-8 text-gray-700">
          Search recipes by what you have or what you need
        </motion.p>

        <motion.div 
        whileInView={{opacity:1,y:0}} 
        initial={{opacity:0,y:100}}
        transition={{duration:2,delay:1}}
        className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/ingredients"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">
            🔍 Search by Ingredients
          </Link>
          <Link
            to="/nutrients"
            className="bg-white border border-purple-600 text-purple-700 px-6 py-3 rounded-xl hover:bg-purple-100 transition">
            🧪 Search by Nutrients
          </Link>
        </motion.div>
      </section>
  )
}

export default Search