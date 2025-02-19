document.addEventListener("DOMContentLoaded", async () => {
    try {
        const spoonacularRecipes = await fetchSpoonacularRecipes(10); // Fetch 10 recipes from Spoonacular
        const mealDBRecipes = await fetchMealDBRecipes(3); // Fetch 3 meals from TheMealDB

        // Combine both API results
        const allRecipes = [...spoonacularRecipes, ...mealDBRecipes];

        renderRecipes(allRecipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
});

// Fetch multiple recipes from Spoonacular API
async function fetchSpoonacularRecipes(count = 10) {
    const apiKey = 'd4564cdf8253475587088f79aa18be9f';
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=${count}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch recipes from Spoonacular');
        }
        const data = await response.json();
        return data.recipes || []; // Return an array of recipes
    } catch (error) {
        console.error('Error fetching recipes from Spoonacular:', error);
        return [];
    }
}

// Fetch multiple random meals from TheMealDB
async function fetchMealDBRecipes(count = 3) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;
    const mealDBRecipes = [];

    try {
        for (let i = 0; i < count; i++) {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch a meal from TheMealDB');
            }
            const data = await response.json();
            if (data.meals) {
                mealDBRecipes.push(...data.meals); // Add meals to the list
            }
        }
        return mealDBRecipes;
    } catch (error) {
        console.error('Error fetching recipes from TheMealDB:', error);
        return [];
    }
}

// Render the combined recipes on the page
function renderRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = ''; // Clear previous content

    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipeContainer.appendChild(recipeCard);
    });
}

// Create a recipe card for display
function createRecipeCard(recipe) {
    const title = recipe.title || recipe.strMeal; // Handle different API response structures
    const image = recipe.image || recipe.strMealThumb;
    const sourceUrl = recipe.sourceUrl || `https://www.themealdb.com/meal/${recipe.idMeal}`;

    const card = document.createElement('div');
    card.classList.add('recipe-card');

    const imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.alt = title;

    const titleElement = document.createElement('h2');
    titleElement.textContent = title;

    const linkElement = document.createElement('a');
    linkElement.href = sourceUrl;
    linkElement.textContent = 'View Recipe';
    linkElement.target = '_blank';

    card.appendChild(imageElement);
    card.appendChild(titleElement);
    card.appendChild(linkElement);

    return card;
}
