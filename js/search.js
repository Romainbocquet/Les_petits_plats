
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

function filterRecipes(foundRecipes) {
  const ingredientCheckboxes = document.querySelectorAll('input[type=checkbox].ingredient');
  const applienceCheckboxes = document.querySelectorAll('input[type=checkbox].appliance');
  const ustensilCheckboxes = document.querySelectorAll('input[type=checkbox].ustensil');

  ingredientCheckboxes.forEach(checkbox => {
    const value = checkbox.value.toLowerCase();
    const isFilterPresent = foundRecipes.some(recipe => {
      const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
      return ingredients.includes(value);
    });

    checkbox.parentNode.style.display = isFilterPresent ? 'block' : 'none';
  });

  applienceCheckboxes.forEach(checkbox => {
    const value = checkbox.value.toLowerCase();
    const isFilterPresent = foundRecipes.some(recipe => {
      const appliance = recipe.appliance.toLowerCase();
      return appliance === value;
    });

    checkbox.parentNode.style.display = isFilterPresent ? 'block' : 'none';

  });

  ustensilCheckboxes.forEach(checkbox => {
    const value = checkbox.value.toLowerCase();
    const isFilterPresent = foundRecipes.some(recipe => {
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

function searchRecipes(query, recipes) {
  const selectedFilters = getSelectedFilters();
  const filteredRecipes = filterRecipesBySelectedFilters(recipes, selectedFilters);
  let isMatchingRecipe = true;
  // créer un tableau vide pour stocker les résultats de recherche
  const results = [];

  // parcourir chaque recette
  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];

    // vérifier si le nom de la recette correspond à la recherche
    if (recipe.name.toLowerCase().includes(query)) {
      results.push(recipe);
      isMatchingRecipe = false;
    }

    if (isMatchingRecipe) {
      // vérifier si l'un des ingrédients de la recette correspond à la recherche
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j];
        if (ingredient.ingredient.toLowerCase().includes(query)) {
          results.push(recipe);
          isMatchingRecipe = false;
        }
      }
    }

    if (isMatchingRecipe) {
      // vérifier si l'un des ustensiles de la recette correspond à la recherche
      for (let k = 0; k < recipe.ustensils.length; k++) {
        const utensil = recipe.ustensils[k];
        if (utensil.toLowerCase().includes(query)) {
          results.push(recipe);
          isMatchingRecipe = false;
        }
      }
    }
  }

  // trier les résultats en fonction du score de pertinence
  results.sort((a, b) => b.relevance - a.relevance);
  // retourner les résultats de la recherche
  filterRecipes(results);
  return results;
}

let searchInput = document.querySelector(".search__input");

searchInput.addEventListener("keyup", function (event) {
  let keyword = searchInput.value.toLowerCase();

  if (keyword.length >= 3) {
    const foundRecipes = searchRecipes(keyword, recipes);
    if (foundRecipes.length === 0) {
      clearRecipesCards();
      displayNoMatchingRecipesMessage();
    } else {
      displayData(foundRecipes);
      filterRecipes(foundRecipes);
      return foundRecipes;
    }
  }
  else if (keyword.length === 0) {
    displayData(recipes);
    return recipes;
  }
});

const filterBtn = document.querySelector('.search__button');
filterBtn.addEventListener('click', function () {
  const foundRecipes = searchRecipes(searchInput.value.toLowerCase(), recipes);
  displayData(foundRecipes);
  return foundRecipes;
});

function clearRecipesCards() {
  const recipesCardsDiv = document.querySelector('#recipes__cards');
  recipesCardsDiv.innerHTML = '';
}

function displayNoMatchingRecipesMessage() {
  const recipesCardsDiv = document.querySelector('#recipes__cards');
  recipesCardsDiv.innerHTML = 'Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.';
}