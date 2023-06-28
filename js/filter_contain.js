export function getIngredientLabel(ingredient) {
  const { ingredient: name, quantity, unit } = ingredient;

  const $ingredientLabel = document.createElement('label');
  const addedFilters = new Set();
  const selectedTag = document.querySelector('.tag-selected');
  const $ingredientText = document.createTextNode(name);
  const $ingredientinput = document.createElement('input');

  $ingredientinput.type = 'checkbox';
  $ingredientinput.name = 'ingredient';
  $ingredientinput.classList.add('ingredient');
  $ingredientinput.value = name;

  $ingredientLabel.appendChild($ingredientinput);
  $ingredientLabel.appendChild($ingredientText);

  $ingredientinput.addEventListener('change', function(event) {
    if ($ingredientinput.checked) {
      const value = $ingredientinput.value;
      if (addedFilters.has(value)) {
        return;
      }
      addedFilters.add(value);
      const newTag = document.createElement('div');
      const closeBtn = document.createElement('span');
      newTag.setAttribute('data-tag', value);
      newTag.classList.add($ingredientinput.name);
      newTag.innerHTML = value;
      closeBtn.classList.add('close');
      closeBtn.innerHTML = '<i class="fas fa-times"></i>';
      newTag.appendChild(closeBtn);
      selectedTag.appendChild(newTag);
      document.querySelector(".search__button").click();

      closeBtn.addEventListener('click', () => {
        const checkbox = document.querySelector(`input[type="checkbox"][value="${value}"]`);
          if (checkbox) {
            checkbox.checked = false;
          }
        newTag.remove();
        addedFilters.delete(value);
        document.querySelector(".search__button").click();
      });
    }
  });

  return $ingredientLabel;
}

export function getApplianceLabel(recipe) {
  // Crée une nouvelle case à cocher pour l'appareil
  const $applianceLabel = document.createElement('label');
  const $applianceInput = document.createElement('input');
  const addedFilters = new Set();
  const selectedTag = document.querySelector('.tag-selected');
  const $applianceText = document.createTextNode(recipe.appliance);

  $applianceInput.type = 'checkbox';
  $applianceInput.name = 'appliance';
  $applianceInput.value = recipe.appliance;
  $applianceInput.className = 'appliance';

  $applianceLabel.appendChild($applianceInput);
  $applianceLabel.appendChild($applianceText);

 // Ajouter un écouteur d'événement pour l'événement 'change'
 $applianceInput.addEventListener('change', function(event) {
  if ($applianceInput.checked) {
    const value = $applianceInput.value;
    if (addedFilters.has(value)) {
      return;
    }
    addedFilters.add(value);
    const newTag = document.createElement('div');
    const closeBtn = document.createElement('span');
    newTag.setAttribute('data-tag', value);
    newTag.classList.add("appareils");
    newTag.innerHTML = value;
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    newTag.appendChild(closeBtn);
    selectedTag.appendChild(newTag);
    document.querySelector(".search__button").click();

    closeBtn.addEventListener('click', () => {
      const checkbox = document.querySelector(`input[type="checkbox"][value="${value}"]`);
      if (checkbox) {
        checkbox.checked = false;
      }
      newTag.remove();
      addedFilters.delete(value);
      document.querySelector(".search__button").click();
    });
  }
});

  return $applianceLabel;
}

export function getUstensilLabel(ustensil) {
  // Créer un nouvel élément input de type checkbox
  const $UstensilCheckbox = document.createElement('input');
  $UstensilCheckbox.type = 'checkbox';
  $UstensilCheckbox.value = ustensil;
  $UstensilCheckbox.classList.add('ustensil');
  const addedFilters = new Set();
  const selectedTag = document.querySelector('.tag-selected');

  // Ajouter un écouteur d'événement pour l'événement 'change'
  $UstensilCheckbox.addEventListener('change', function(event) {
    if ($UstensilCheckbox.checked) {
      const value = $UstensilCheckbox.value;
      if (addedFilters.has(value)) {
        return;
      }
      addedFilters.add(value);
      const newTag = document.createElement('div');
      const closeBtn = document.createElement('span');
      newTag.setAttribute('data-tag', value);
      newTag.classList.add("ustensil");
      newTag.innerHTML = value;
      closeBtn.classList.add('close');
      closeBtn.innerHTML = '<i class="fas fa-times"></i>';
      newTag.appendChild(closeBtn);
      selectedTag.appendChild(newTag); 
      document.querySelector(".search__button").click();

      closeBtn.addEventListener('click', () => {
        const checkbox = document.querySelector(`input[type="checkbox"][value="${value}"]`);
        if (checkbox) {
          checkbox.checked = false;
        }
        newTag.remove();
        addedFilters.delete(value);
        document.querySelector(".search__button").click();
      });
    }
  });

  // Créer un nouvel élément label pour la case à cocher
  const $UstensilLabel = document.createElement('label');
  $UstensilLabel.appendChild($UstensilCheckbox);
  $UstensilLabel.appendChild(document.createTextNode(ustensil));

  return $UstensilLabel;
}