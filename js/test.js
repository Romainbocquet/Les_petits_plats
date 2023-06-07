import { recipes } from '../data/recipes.js';

// Fonction de recherche
function searchRecipes(searchString) {
  // Convertir la chaîne de recherche en minuscules pour faciliter la recherche
  const search = searchString.toLowerCase();

  // Filtrer les recettes qui contiennent la chaîne de recherche dans leur nom ou leur liste d'ingrédients
  const matchingRecipes = recipes.filter(recipe => {
    const name = recipe.name.toLowerCase();
    const ingredients = recipe.ingredients.join(" ").toLowerCase();
    return name.includes(search) || ingredients.includes(search);
  });

  // Retourner les recettes correspondantes
  return matchingRecipes;
}

function searchRecipes2(query, recipes) {
  // créer un tableau vide pour stocker les résultats de recherche
  const results = [];
  
  // parcourir chaque recette
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    
    // vérifier si le nom de la recette correspond à la recherche
    if (recipe.name.toLowerCase().includes(query)) {
      results.push(recipe);
      continue;
    }
    
    // vérifier si l'un des ingrédients de la recette correspond à la recherche
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      if (ingredient.ingredient.toLowerCase().includes(query)) {
        results.push(recipe);
        break;
      }
    }
    
    // vérifier si l'un des ustensiles de la recette correspond à la recherche
    for (let k = 0; k < recipe.ustensils.length; k++) {
      const utensil = recipe.ustensils[k];
      if (utensil.toLowerCase().includes(query)) {
        results.push(recipe);
        break;
      }
    }
  }
  
  // trier les résultats en fonction du score de pertinence
  results.sort((a, b) => b.relevance - a.relevance);
  
  // retourner les résultats de la recherche
  return results;
}

const keyword = "eau";
const results = searchRecipes(keyword);
console.log(`Résultats de la recherche 1 pour "${keyword}" :`, results);

// On appelle la fonction avec le mot-clé "Poulet" et la liste de recettes "recipes"
const keyword2 = "pomme";
const foundRecipes = searchRecipes2(keyword2, recipes);

// On affiche le résultat dans la console
console.log(`Résultats de la recherche 2 pour "${keyword2}" :`, foundRecipes);


// Exemple d'utilisation de la fonction de recherche

