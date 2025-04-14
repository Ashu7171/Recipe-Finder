import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"; // ✅ Make sure the path is correct

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader />
      </div>
    );
  }

  if (!recipe) {
    return <div className="p-6 text-center">Recipe not found.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full rounded-xl mb-6"
      />

      {/* Summary with HTML tags */}
      <div
        className="mb-6 text-gray-800"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />

      {/* Ingredients */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Ingredients</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id} className="flex items-center space-x-4">
            <img
              src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}
              alt={ingredient.name}
              className="w-12 h-12 rounded"
            />
            <span>{ingredient.original}</span>
          </li>
        ))}
      </ul>

      {/* Instructions */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Instructions</h2>
      {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          {recipe.analyzedInstructions[0].steps.map((step) => (
            <li key={step.number}>{step.step}</li>
          ))}
        </ol>
      ) : (
        <p className="text-gray-700">No instructions available.</p>
      )}
    </div>
  );
};

export default RecipeDetail;
