import React from 'react'
import { motion } from 'framer-motion';


const Dishes = () => {
  return (
    <section className="bg-white py-12 px-6 w-full">
        <motion.h2 
        whileInView={{opacity:1,y:0}} 
        initial={{opacity:0,y:100}}
        transition={{duration:1,delay:1}}
        className="text-3xl font-bold text-center text-purple-800 mb-10">
            Popular Categories
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
            <motion.div 
            whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="hover:scale-105 transition">
            <img src="/images/salad.jpg" alt="Salads" className="w-full h-40 object-cover rounded-xl shadow-md" />
            <h3 className="mt-4 text-lg font-semibold text-purple-700">Salads</h3>
            </motion.div>

            <motion.div 
            whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="hover:scale-105 transition">
            <img src="/images/dessert.jpg" alt="Desserts" className="w-full h-40 object-cover rounded-xl shadow-md" />
            <h3 className="mt-4 text-lg font-semibold text-purple-700">Desserts</h3>
            </motion.div>

            <motion.div 
            whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="hover:scale-105 transition">
            <img src="/images/smoothie.jpg" alt="Smoothies" className="w-full h-40 object-cover rounded-xl shadow-md" />
            <h3 className="mt-4 text-lg font-semibold text-purple-700">Smoothies</h3>
            </motion.div>

            <motion.div 
            whileInView={{opacity:1,y:0}} 
            initial={{opacity:0,y:100}}
            transition={{duration:1,delay:1}}
            className="hover:scale-105 transition">
            <img src="/images/soup.jpg" alt="Soups" className="w-full h-40 object-cover rounded-xl shadow-md" />
            <h3 className="mt-4 text-lg font-semibold text-purple-700">Soups</h3>
            </motion.div>
        </div>
      </section>
  )
}

export default Dishes