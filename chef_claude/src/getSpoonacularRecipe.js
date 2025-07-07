const API_KEY = "YOUR_SPOONACULAR_API_KEY"; // Replace with your real API key

export async function getRecipeFromGemini(ingredients) {
  const apiKey = "YOUR_REAL_SPOONACULAR_API_KEY"; // <-- Replace this!
  const query = ingredients.join(",");
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(query)}&number=1&apiKey=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    return "Sorry, could not fetch a recipe at this time.";
  }
  const data = await response.json();
  console.log("Spoonacular data:", data); // <-- Add this line
  if (data.length === 0) {
    return "No recipes found for these ingredients.";
  }
  return `Try this recipe: <strong>${data[0].title}</strong>`;
}
