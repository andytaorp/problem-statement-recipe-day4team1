import { useEffect } from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";
import RecipeDetails from "../components/RecipeDetails";
import RecipeForm from "../components/RecipeForm";

const Home = () => {
  const { recipes, dispatch } = useRecipesContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const json = await response.json();

        dispatch({ type: "SET_RECIPES", payload: json });
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [dispatch]); // ✅ Fetch recipes when app loads

  return (
    <div className="home">
      <div className="recipes">
        {recipes && recipes.map((recipe) => (
          <RecipeDetails key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <RecipeForm />
    </div>
  );
};

export default Home;
