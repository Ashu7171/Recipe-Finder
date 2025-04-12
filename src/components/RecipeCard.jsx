import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="bg-slate-100 w-full shadow-md rounded-2xl overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h2 className="text-xl font-semibold text-black mb-2">{recipe.title}</h2>
      <div className="text-sm text-emerald-500 mb-1">
        <strong>Used Ingredients:</strong>{" "}
        {recipe.usedIngredients.map((item) => item.name).join(", ")}
      </div>
      <div className="text-sm text-red-500 mb-2">
        <strong>Missing Ingredients:</strong>{" "}
        {recipe.missedIngredients.map((item) => item.name).join(", ")}
      </div>
      <div className="text-right text-black text-sm">
        ❤️ {recipe.likes} Likes
      </div>
    </motion.div>
  );
};

export default RecipeCard;
