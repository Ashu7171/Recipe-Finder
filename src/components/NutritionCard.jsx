import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NutritionCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  return (
    <motion.div
      className="bg-white w-full shadow-md rounded-2xl overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.03 }}
    >
      {/* Recipe Image */}
      <div onClick={handleClick} className="cursor-pointer">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          {recipe.title}
        </h2>

        {/* Nutrition Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="bg-emerald-50 px-3 py-2 rounded-xl">
            <strong className="block text-emerald-700">Calories</strong>
            {recipe.calories}
          </div>
          <div className="bg-blue-50 px-3 py-2 rounded-xl">
            <strong className="block text-blue-700">Protein</strong>
            {recipe.protein}
          </div>
          <div className="bg-yellow-50 px-3 py-2 rounded-xl">
            <strong className="block text-yellow-700">Fat</strong>
            {recipe.fat}
          </div>
          <div className="bg-pink-50 px-3 py-2 rounded-xl">
            <strong className="block text-pink-700">Carbs</strong>
            {recipe.carbs}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NutritionCard;
