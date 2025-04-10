import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';


const IngSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=12&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong while fetching recipes.');
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
      <h1 className="text-2xl font-bold mb-4 text-center">Search Recipes by Ingredients</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="e.g. tomato, cheese, pasta"
          className="flex-1 p-2 border rounded"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IngSearch;
