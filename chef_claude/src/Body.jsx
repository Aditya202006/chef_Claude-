import React from "react";
import { getRecipeFromGemini } from "./getSpoonacularRecipe.js"; // Make sure this file exists

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState(false);
  const [recipe, setRecipe] = React.useState("");

  function addIngredient(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newIngredient = formData.get("ingredient").trim();

    if (
        newIngredient &&
        !ingredients.some((item) => item.toLowerCase() === newIngredient.toLowerCase())
    ) {
        setIngredients((prev) => [...prev, newIngredient]);
    }

    event.target.reset();
}


  async function fetchRecipe() {
    const result = await getRecipeFromGemini(ingredients);
    setRecipe(result);
  }

  function toggleRecipeShown() {
    if (!recipeShown) {
      fetchRecipe();
    }
    setRecipeShown((prev) => !prev);
  }

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  return (
    <main>
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input type="text" placeholder="e.g. chicken" name="ingredient" />
        <button>Add</button>
      </form>

      {ingredients.length > 0 && (
        <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list">{ingredientsListItems}</ul>

          {ingredients.length > 3 && (
            <div className="get-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button onClick={toggleRecipeShown}>Generate recipe</button>
            </div>
          )}
        </section>
      )}

      {recipeShown && (
        <section>
          <h2>Chef Gemini Recommends:</h2>
          {recipe ? (
            <div
              dangerouslySetInnerHTML={{
                __html: recipe.replace(/\n/g, "<br />"),
              }}
            />
          ) : (
            <p>Loading recipe from Gemini...</p>
          )}
        </section>
      )}
    </main>
  );
}
