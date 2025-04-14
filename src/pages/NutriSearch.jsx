// import React, { useState } from "react";
// import Loader from "../components/Loader";
// import NutritionCard from "../components/NutritionCard";

// const NutriSearch = () => {
//   const [protein, setProtein] = useState({ min: "", max: "" });
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);

//   const API_KEY = import.meta.env.VITE_API_KEY;

//   const handleSearch = async () => {
//     if (!protein.min || !protein.max) {
//       setError("Please enter both minimum and maximum protein values.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setHasSearched(true);
//     try {
//       const response = await fetch(
//         `https://api.spoonacular.com/recipes/findByNutrients?minProtein=${protein.min}&maxProtein=${protein.max}&number=12&apiKey=${API_KEY}`
//       );
//       if (!response.ok)
//         throw new Error("Something went wrong while fetching recipes.");
//       const data = await response.json();
//       setRecipes(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-purple-700">
//         Search Recipes by Protein Range
//       </h1>

//       {/* Input fields */}
//       <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
//         <input
//           type="number"
//           placeholder="Min Protein"
//           className="w-full sm:w-48 p-2 border rounded-md text-sm"
//           value={protein.min}
//           onChange={(e) => setProtein({ ...protein, min: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Max Protein"
//           className="w-full sm:w-48 p-2 border rounded-md text-sm"
//           value={protein.max}
//           onChange={(e) => setProtein({ ...protein, max: e.target.value })}
//         />
//         <button
//           onClick={handleSearch}
//           className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
//         >
//           Search
//         </button>
//       </div>

//       {/* Error message */}
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//       {/* Recipes or loader */}
//       {loading ? (
//         <div className="flex items-center justify-center h-[80vh]">
//           <Loader />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {recipes.length > 0 ? (
//             recipes.map((recipe) => (
//               <NutritionCard key={recipe.id} recipe={recipe} />
//             ))
//           ) : hasSearched ? (
//             <p className="text-center text-gray-500">No recipes found.</p>
//           ) : null}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NutriSearch;

import React, { useState } from "react";
import Loader from "../components/Loader";
import NutritionCard from "../components/NutritionCard";
import Pagination from "../components/Pagination";

const NutriSearch = () => {
  const [protein, setProtein] = useState({ min: "", max: "" });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const RECIPES_PER_PAGE = 12;

  const handleSearch = async () => {
    if (!protein.min || !protein.max) {
      setError("Please enter both minimum and maximum protein values.");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByNutrients?minProtein=${protein.min}&maxProtein=${protein.max}&number=100&apiKey=${API_KEY}`
      );
      if (!response.ok)
        throw new Error("Something went wrong while fetching recipes.");
      const data = await response.json();
      setRecipes(data);
      setCurrentPage(1); // Reset to page 1 after search
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLast = currentPage * RECIPES_PER_PAGE;
  const indexOfFirst = indexOfLast - RECIPES_PER_PAGE;
  const currentRecipes = recipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-purple-700">
        Search Recipes by Protein Range
      </h1>

      {/* Input fields */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
        <input
          type="number"
          placeholder="Min Protein"
          className="w-full sm:w-48 p-2 border rounded-md text-sm"
          value={protein.min}
          onChange={(e) => setProtein({ ...protein, min: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Protein"
          className="w-full sm:w-48 p-2 border rounded-md text-sm"
          value={protein.max}
          onChange={(e) => setProtein({ ...protein, max: e.target.value })}
        />
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          Search
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Recipes or loader */}
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentRecipes.length > 0 ? (
              currentRecipes.map((recipe) => (
                <NutritionCard key={recipe.id} recipe={recipe} />
              ))
            ) : hasSearched ? (
              <p className="text-center text-gray-500 col-span-full">
                No recipes found.
              </p>
            ) : null}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default NutriSearch;
