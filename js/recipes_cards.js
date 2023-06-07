function getIngredients(ingredients) {
  const column = document.createElement('div');
  column.classList.add('ingredients__detailled--bloc');

  ingredients.forEach((ingredient) => {
    const ingredientName = document.createElement('p');
    ingredientName.setAttribute('data-ingredient', ingredient.ingredient);
    if (ingredient.unit === '' || ingredient.unit == null) {
      if (ingredient.quantity) {
        ingredientName.innerHTML = `${ingredient.ingredient} : ${ingredient.quantity}`;
      } else {
        ingredientName.innerHTML = `${ingredient.ingredient}`;
      }
    } else {
      ingredientName.innerHTML = `${ingredient.ingredient} : ${ingredient.quantity} ${ingredient.unit}`;
    }
    column.appendChild(ingredientName);
  });
  
  return column;
}

function getRecipeCard(data) {

  const { id, name, servings, ingredients, time, description,  appliance, ustensils } = data;

  const $recipeCardContaner = document.createElement('div');
  $recipeCardContaner.setAttribute('id', id);
  $recipeCardContaner.setAttribute('servings', servings);
  $recipeCardContaner.className = 'reciepe__card';


  const $recipeCardHeader = document.createElement('div');
  $recipeCardHeader.className = 'card-header';
  $recipeCardHeader.classList.add('d-flex');

  const $recipImage = document.createElement('div');
  $recipImage.className = 'image';

  const $recipeName = document.createElement('h2');
  $recipeName.textContent = name;
  $recipeName.className = 'nom';

  const $duration = document.createElement('div');
  $duration.className = 'duration';
  $duration.classList.add('d-flex');

  const $iconeTime = document.createElement('i');
  $iconeTime.className = 'fa-regular fa-clock fa-lg';

  const $recipeDuration = document.createElement('p');
  $recipeDuration.innerHTML = `<strong>${time} min</srtong>`;
  $recipeDuration.className = 'time';

  const $recipeInfo = document.createElement('div');
  $recipeInfo.classList.add('informations');
  $recipeInfo.classList.add('d-flex');
  $recipeInfo.setAttribute('data-appliance', appliance);
  $recipeInfo.setAttribute('data-ustensils', ustensils);

  const recipeIngredients = getIngredients(ingredients);

  const $recipeDescription = document.createElement('p');
  $recipeDescription.textContent = description;
  $recipeDescription.className = 'description';

  $recipeCardContaner.appendChild($recipImage);
  $recipeCardContaner.appendChild($recipeCardHeader);
  $recipeCardHeader.appendChild($recipeName);
  $recipeCardHeader.appendChild($duration);
  $duration.appendChild($iconeTime);
  $duration.appendChild($recipeDuration);
  $recipeCardContaner.appendChild($recipeInfo);
  $recipeInfo.appendChild(recipeIngredients);
  $recipeInfo.appendChild($recipeDescription);

  return ($recipeCardContaner);
}