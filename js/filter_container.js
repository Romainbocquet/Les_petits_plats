const ingredientSearch = document.getElementById('ingredient-search');
const applianceSearch = document.getElementById('appliance-search');
const ustensilSearch = document.getElementById('ustensiles-search');
const filterContentIngredient = document.querySelector('.filter-content-ingredient');
const filterContentappliance = document.querySelector('.filter-content-appliance');
const filterContentustensil = document.querySelector('.filter-content-ustensils');


ingredientSearch.addEventListener('keyup', filterIngredients);
applianceSearch.addEventListener('keyup', filterAppliance);
ustensilSearch.addEventListener('keyup', filterUstensils);


function filterIngredients() {
  const ingredientLabels = document.querySelectorAll('#ingredient-grid label');
  let searchValue = this.value;
  if (this.value != undefined) {
    searchValue = this.value.toLowerCase();
    ingredientLabels.forEach(function(label) {
      const labelValue = label.querySelector('#ingredient-grid label input[type="checkbox"]').value.toLowerCase();
      if (labelValue.includes(searchValue)) {
        label.style.display = 'block';
      } else {
        label.style.display = 'none';
        const visibleLabels = Array.from(ingredientLabels).filter(label => label.style.display !== 'none');
        if (visibleLabels.length === 0) {
          filterContentIngredient.classList.remove('open');
        label.style.display = 'block';  
        } else {
          filterContentIngredient.classList.add('open');
        }
      }
    });
  }
};

function filterAppliance() {
  const applianceLabels = document.querySelectorAll('#appliance-grid label');
  let searchValue = this.value;
  if (this.value != undefined) {
    searchValue = this.value.toLowerCase();
    applianceLabels.forEach(function(label) {
      const labelValue = label.querySelector('#appliance-grid label input[type="checkbox"]').value.toLowerCase();
      if (labelValue.includes(searchValue)) {
        label.style.display = 'block';
      } else {
        label.style.display = 'none';
        const visibleLabels = Array.from(applianceLabels).filter(label => label.style.display !== 'none');
        if (visibleLabels.length === 0) {
          filterContentappliance.classList.remove('open');
        label.style.display = 'block';
        } else {
          filterContentappliance.classList.add('open');
        }
      }
    });
  }
};

function filterUstensils() {
  const ustensilsLabels = document.querySelectorAll('#ustensils-grid label');
    let searchValue = this.value;
  if (this.value != undefined) {
    searchValue = this.value.toLowerCase();
    ustensilsLabels.forEach(function(label) {
      const labelValue = label.querySelector('#ustensils-grid label input[type="checkbox"]').value.toLowerCase();
      if (labelValue.includes(searchValue)) {
        label.style.display = 'block';
      } else {
        label.style.display = 'none';
        const visibleLabels = Array.from(ustensilsLabels).filter(label => label.style.display !== 'none');
        if (visibleLabels.length === 0) {
          filterContentustensil.classList.remove('open');
          label.style.display = 'block';
        } else {
          filterContentustensil.classList.add('open');
        }
      }
    });
  }
};