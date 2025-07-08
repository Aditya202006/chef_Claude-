export async function getRecipeFromGemini(ingredients) {
  const apiKey = "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";
  const url = "https://api.gemini.googleapis.com/v1beta/models/gemini-pro:generateContent";
  const prompt = `Suggest a detailed recipe using these ingredients: ${ingredients.join(", ")}. Include a title, ingredients list, and step-by-step instructions.`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return `Sorry, could not fetch a recipe at this time. Error: ${errorText}`;
    }

    const data = await response.json();
    console.log("Gemini API response:", data);

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No recipe found in Gemini response."
    );
  } catch (err) {
    console.error("Fetch error:", err);
    return "Sorry, a network or CORS error occurred.";
  }
} 
