import { getIngredientLabel, getApplianceLabel, getUstensilLabel } from '../js/filter_contain.js';

let recipes = [];

async function getDataJson() {
  const response = await fetch ('/data/recipes.json');
  recipes = (await response.json()).recipes;
  init();
}

getDataJson();

function init() {
  displayData(recipes);
  displayIngredients(recipes);
  displayAppliances(recipes);
  displayUstensils(recipes);
}

export default function displayData(recipes) {
  const recipeSection = document.getElementById('recipes__cards');
  recipeSection.innerHTML = '';
  for (const recipe of recipes) {
    const recipeCard = getRecipeCard(recipe);
    recipeSection.appendChild(recipeCard);
  }
}

export function displayIngredients(recipes) {
  // Récupère l'élément de la grille des ingrédients par son ID
  const filterSection = document.getElementById('ingredient-grid');
  // Réinitialise le contenu de la grille des ingrédients
  filterSection.innerHTML = '';

  // Créer un nouvel ensemble Set pour stocker les noms d'ingrédients sans doublon
  const ingredientNames = new Set();

  // Parcourt toutes les recettes
  for (const recipe of recipes) {
    // Parcourt tous les ingrédients de chaque recette
    for (const ingredient of recipe.ingredients) {
      // Stocke le nom de l'ingrédient en minuscules, sans les espaces de début et de fin
      const ingredientName = ingredient.ingredient.trim().toLowerCase();
      // Vérifie si le nom de l'ingrédient n'est pas déjà dans l'ensemble Set
      if (!ingredientNames.has(ingredientName)) {
        // Si le nom de l'ingrédient n'est pas déjà dans l'ensemble Set, crée une nouvelle case à cocher pour l'ingrédient
        const filterElt = getIngredientLabel(ingredient);
        // Ajoute la nouvelle case à cocher à la grille des ingrédients
        filterSection.appendChild(filterElt);
        // Ajoute le nom de l'ingrédient à l'ensemble Set pour éviter les doublons
        ingredientNames.add(ingredientName);
      }
    }
  }
}

function displayUstensils(recipes) {
  // Récupère l'élément de la grille des ustensiles par son ID
  const filterSection = document.getElementById('ustensils-grid');
  // Réinitialise le contenu de la grille des ustensiles
  filterSection.innerHTML = '';

  // Créer un nouvel ensemble Set pour stocker les noms d'ustensiles sans doublon
  const ustensilNames = new Set();

  // Parcourt toutes les recettes
  for (const recipe of recipes) {
    // Parcourt tous les ustensiles de chaque recette
    for (const ustensil of recipe.ustensils) {
      // Stocke le nom de l'ustensile en minuscules, sans les espaces de début et de fin
      const ustensilName = ustensil.trim().toLowerCase();
      // Vérifie si le nom de l'ustensile n'est pas déjà dans l'ensemble Set
      if (!ustensilNames.has(ustensilName)) {
        // Si le nom de l'ustensile n'est pas déjà dans l'ensemble Set, crée une nouvelle case à cocher pour l'ustensile
        const filterElt = getUstensilLabel(ustensil);
        // Ajoute la nouvelle case à cocher à la grille des ustensiles
        filterSection.appendChild(filterElt);
        // Ajoute le nom de l'ustensile à l'ensemble Set pour éviter les doublons
        ustensilNames.add(ustensilName);
      }
    }
  }
}

function displayAppliances(recipes) {
  // Récupère l'élément de la grille des appareils par son ID
  const filterSection = document.getElementById('appliance-grid');
  // Réinitialise le contenu de la grille des appareils
  filterSection.innerHTML = '';

  // Créer un nouvel ensemble Set pour stocker les noms d'appareils sans doublon
  const applianceNames = new Set();

  // Parcourt toutes les recettes
  for (const recipe of recipes) {
    // Stocke le nom de l'appareil en minuscules, sans les espaces de début et de fin
    const applianceName = recipe.appliance.trim().toLowerCase();
    // Vérifie si le nom de l'appareil n'est pas déjà dans l'ensemble Set
    if (!applianceNames.has(applianceName)) {
      // Si le nom de l'appareil n'est pas déjà dans l'ensemble Set, crée une nouvelle case à cocher pour l'appareil
      const filterElt = getApplianceLabel(recipe);
      // Ajoute la nouvelle case à cocher à la grille des appareils
      filterSection.appendChild(filterElt);
      // Ajoute le nom de l'appareil à l'ensemble Set pour éviter les doublons
      applianceNames.add(applianceName);
    }
  }
}

const filterHeaderIng = document.querySelector('.chev-ingredient');
const filterHeaderApp = document.querySelector('.chev-appliance');
const filterHeaderUst = document.querySelector('.chev-ustensiles');


filterHeaderIng.addEventListener('click', function() {
  if (filterContentIngredient.classList.contains('open')) {
    filterContentIngredient.classList.remove('open');
    filterHeaderIng.parentNode.classList.remove('filter-open-Ing');
    filterHeaderIng.classList.remove('rotate');
    ingredientSearch.value='';
  } else {
    filterContentIngredient.classList.add('open');
    filterContentustensil.classList.remove('open');
    filterContentappliance.classList.remove('open');
    filterHeaderApp.parentNode.classList.remove('filter-open-app');
    filterHeaderUst.parentNode.classList.remove('filter-open-ust');
    filterHeaderIng.parentNode.classList.add('filter-open-Ing');
    filterHeaderIng.classList.add('rotate');
    filterIngredients();
  }
});

filterHeaderApp.addEventListener('click', function() {
  if (filterContentappliance.classList.contains('open')) {
    filterContentappliance.classList.remove('open');
    filterHeaderApp.parentNode.classList.remove('filter-open-app');
    filterHeaderApp.classList.remove('rotate');
    applianceSearch.value='';
  } else {
    filterContentappliance.classList.add('open');
    filterContentustensil.classList.remove('open');
    filterContentIngredient.classList.remove('open');
    filterHeaderIng.parentNode.classList.remove('filter-open-Ing');
    filterHeaderUst.parentNode.classList.remove('filter-open-ust');
    filterHeaderApp.parentNode.classList.add('filter-open-app');
    filterHeaderApp.classList.add('rotate');
    filterIngredients();
  }
})

filterHeaderUst.addEventListener('click', function() {
  if (filterContentustensil.classList.contains('open')) {
    filterContentustensil.classList.remove('open');
    filterHeaderUst.parentNode.classList.remove('filter-open-ust');
    filterHeaderUst.classList.remove('rotate');
    ustensilSearch.value='';
  } else {
    filterContentustensil.classList.add('open');
    filterContentappliance.classList.remove('open');
    filterContentIngredient.classList.remove('open');
    filterHeaderApp.parentNode.classList.remove('filter-open-app');
    filterHeaderIng.parentNode.classList.remove('filter-open-Ing');
    filterHeaderUst.parentNode.classList.add('filter-open-ust');
    filterHeaderUst.classList.add('rotate');
    filterIngredients();
  }
  
})
// const $ingredientinput = document.querySelectorAll("label");
// console.log($ingredientinput);

// $ingredientinput.forEach(element => {
//   element.addEventListener('click', function(event) {
//     getSelectedTagsValues();
//   })
// });


// function getSelectedTagsValues() {
//   const selectedTags = document.querySelectorAll('.tag-selected > div');
//   const selectedTagsValues = Array.from(selectedTags).map((tag) => tag.getAttribute('data-tag'));

//   searchRecipes2(selectedTagsValues);

//   return selectedTagsValues;
// }


