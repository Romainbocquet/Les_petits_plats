
import { recipes } from '../data/recipes.js';
import displayData from '../js/script.js';


function getSelectedFilters() {
  const selectedFilters = [];
  const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  checkboxes.forEach((checkbox) => {
    const value = checkbox.value.toLowerCase();
    selectedFilters.push(value);
  });

  return selectedFilters;
}

function filterRecipes(recette) {
  const ingredientCheckboxes = document.querySelectorAll('input[type=checkbox].ingredient');
  const ustensilCheckboxes = document.querySelectorAll('input[type=checkbox].ustensil');

  ingredientCheckboxes.forEach(checkbox => {
    const value = checkbox.value.toLowerCase();
    const isFilterPresent = recette.some(recipe => {
      const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
      return ingredients.includes(value);
    });

    checkbox.parentNode.style.display = isFilterPresent ? 'block' : 'none';
  });

  ustensilCheckboxes.forEach(checkbox => {
    const value = checkbox.value.toLowerCase();
    const isFilterPresent = recette.some(recipe => {
      const ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
      return ustensils.includes(value);
    });

    checkbox.parentNode.style.display = isFilterPresent ? 'block' : 'none';
  });
}

function filterRecipesBySelectedFilters(recipes, selectedFilters) {
  if (selectedFilters.length === 0) {
    return recipes;
  }

  const filteredRecipes = recipes.filter(recipe => {
    const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
    const appliance = recipe.appliance.toLowerCase();
    const ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());

    return selectedFilters.every(filter => {
      filter = filter.toLowerCase();

      // Vérifier si le filtre est présent dans les ingrédients, l'appareil ou les ustensiles de la recette
      return ingredients.includes(filter) || appliance === filter || ustensils.includes(filter);
    });
  });

  return filteredRecipes;
}

let searchInput = document.querySelector(".search__input");

function createKeywordIndex(recipes) {
  const keywordIndex = {};

  // Parcourir chaque recette
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeId = recipe.id;

    // Extraire les mots-clés de la recette
    const keywords = extractKeywords(recipe);

    // Parcourir chaque mot-clé de la recette
    for (let j = 0; j < keywords.length; j++) {
      const keyword = keywords[j].toLowerCase();

      // Vérifier si le mot-clé existe déjà dans l'index
      if (keywordIndex.hasOwnProperty(keyword)) {
        const recipeIds = keywordIndex[keyword];
        
        // Vérifier si la recette est déjà attribuée à ce mot-clé
        if (!recipeIds.has(recipeId)) {
          recipeIds.add(recipeId);
        }
      } else {
        keywordIndex[keyword] = new Set([recipeId]);
      }
    }
  }

  return keywordIndex;
}


const removeAccentsAndApostrophes = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/.*'/, '');

function extractKeywords(recipe) {
  const keywords = [];

  // Ajouter le nom de la recette comme mot-clé (sans accents et apostrophes)
  keywords.push(removeAccentsAndApostrophes(recipe.name));

  // Ajouter chaque ingrédient comme mot-clé (sans accents et apostrophes)
  for (let i = 0; i < recipe.ingredients.length; i++) {
    const ingredient = removeAccentsAndApostrophes(recipe.ingredients[i].ingredient);
    keywords.push(ingredient);
  }

  // Ajouter la description comme mot-clé (sans accents et apostrophes)
  const descriptionWords = recipe.description.split(' ').map(word => removeAccentsAndApostrophes(word));
  keywords.push(...descriptionWords);

  // Transformer la chaîne de caractères en tableau de mots sans espaces, points, parenthèses, accents et apostrophes
  const cleanKeywords = keywords.join(' ').split(/\s+/).map(word => word.replace(/[().]+$/, ''));
  
  // Supprimer les mots de moins de 3 caractères
  const filteredKeywords = cleanKeywords.filter(word => word.length > 3);
  
  return filteredKeywords;
}

let searchButton = document.querySelector(".search__button");

searchButton.addEventListener("click", () => {
  const searchQuery = searchInput.value.toLowerCase();
  const searchQueryClear = removeAccentsAndApostrophes(searchQuery);
  const searchKeywords = searchQueryClear.split(" ");
  const keywordIndex = createKeywordIndex(recipes);
  const selectedFilters = getSelectedFilters();
  const filteredRecipes = filterRecipesBySelectedFilters(recipes, selectedFilters);

  let matchingRecipeIds = null;
  if (!searchQuery && selectedFilters.length === 0) {
    displayData(recipes);
  }
  // Parcourir chaque mot-clé de recherche
  for (const keyword of searchKeywords) {
    if (keyword.length > 3) {
      const keywordIds = keywordIndex[keyword];

      if (keywordIds && keywordIds.size > 0) {
        if (matchingRecipeIds === null) {
          // Si c'est le premier mot-clé, initialiser avec les IDs correspondants
          matchingRecipeIds = new Set(keywordIds);
        } else {
          // Sinon, conserver uniquement les IDs présents dans l'ensemble courant et les IDs correspondants au mot-clé actuel
          matchingRecipeIds = new Set([...matchingRecipeIds].filter(recipeId => keywordIds.has(recipeId)));
        }
      } else {
        // Si l'un des mots-clés ne correspond à aucune recette, réinitialiser matchingRecipeIds à null
        matchingRecipeIds = null;
        break;
      }
    }
  }

  if (matchingRecipeIds && matchingRecipeIds.size > 0) {
    const matchingRecipes = filteredRecipes.filter(recipe => matchingRecipeIds.has(recipe.id));
    filterRecipes(matchingRecipes);
    displayData(matchingRecipes);
  } else if(!searchQuery) {
    filterRecipes(filteredRecipes);
    displayData(filteredRecipes);
  }
  else {
    console.log("Aucune recette ne correspond aux mots-clés de recherche.");
  }
});




