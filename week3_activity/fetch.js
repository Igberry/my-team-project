let results = null;

function doStuff(data) {
  results = data;
  console.log("first: ", results); // Should output data with the list of Pokémon

  // Get the <select> element
  const selectElement = document.getElementById("pokemon-list");
  selectElement.innerHTML = ""; // Clear the loading message

  // Populate the <select> element with Pokémon names
  results.results.forEach((pokemon) => {
    const option = document.createElement("option");
    option.textContent = pokemon.name;
    option.value = pokemon.url;
    selectElement.appendChild(option);
  });
}

// Fetch data from the Pokémon API
const url = "https://pokeapi.co/api/v2/pokemon";

let result = null;
console.log("second: ", result); // Should output "second: null"

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    doStuff(data);
  })
  .catch((error) => console.error("Error fetching data:", error));
