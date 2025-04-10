import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard"; // Import the updated RecipeCard
import Loader from "../components/Loader"; // Assuming you already have the Loader component

const NutriSearch = () => {
  const [protein, setProtein] = useState({ min: "", max: "" });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    if (!protein.min || !protein.max) {
      setError("Please enter both minimum and maximum protein values.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByNutrients?minProtein=${protein.min}&maxProtein=${protein.max}&number=12&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong while fetching recipes.");
      }

      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Recipes by Nutrients</h1>

      {/* Protein Input Fields */}
      <div className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="Min Protein"
          className="flex-1 p-2 border rounded"
          value={protein.min}
          onChange={(e) => setProtein({ ...protein, min: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Protein"
          className="flex-1 p-2 border rounded"
          value={protein.max}
          onChange={(e) => setProtein({ ...protein, max: e.target.value })}
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Loader or recipe cards */}
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
          ) : (
            <p className="text-center text-gray-500">No recipes found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NutriSearch;
