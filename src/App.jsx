// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IngSearch from "./pages/IngSearch";
import NutriSearch from "./pages/NutriSearch";
import Layout from "./components/Layout";
import RecipeDetail from "./components/RecipeDetails";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/ingredients"
        element={
          <Layout>
            <IngSearch />
          </Layout>
        }
      />
      <Route
        path="/nutrients"
        element={
          <Layout>
            <NutriSearch />
          </Layout>
        }
      />
      <Route
        path="/recipe/:id"
        element={
          <Layout>
            <RecipeDetail />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
