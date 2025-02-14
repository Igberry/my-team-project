document.addEventListener("DOMContentLoaded", () => {
    // Fetch recipe data from Spoonacular API
    fetchRecipes()
        .then(recipes => renderRecipes(recipes))
        .catch(error => console.error('Error fetching recipes:', error));
});

async function fetchRecipes() {
    const apiKey = 'd4564cdf8253475587088f79aa18be9f';
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw new Error('Unable to fetch recipes');
    }
}

function renderRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = ''; // Clear previous content
    
    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipeContainer.appendChild(recipeCard);
    });
}

function createRecipeCard(recipe) {
    const { title, image, sourceUrl } = recipe;
    
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
