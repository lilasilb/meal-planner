function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear existing list

    fetch('/recipes')
        .then(response => response.json())
        .then(recipes => {
            recipes.forEach(recipe => {
                const recipeItem = document.createElement('li');
                recipeItem.textContent = recipe.name;
                recipeList.appendChild(recipeItem);
            });
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

function renderInventory() {
    const ingredientList = document.getElementById('inventory-list');
    ingredientList.innerHTML = ''; // Clear existing list

    fetch('/inventory')
        .then(response => response.json())
        .then(inventory => {
            inventory.forEach(item => {
                const inventoryItem = document.createElement('li');
                inventoryItem.textContent = item.name;
                ingredientList.appendChild(inventoryItem);
            });
        })
        .catch(error => {
            console.error('Error fetching inventory:', error);
        });
}

function start() {
    console.log('Page loaded');


    // Recipe input
    const recipeList = document.getElementById('recipe-list');
    const recipeInput = document.getElementById('recipe-name');

    //  Ingredient input
    const ingredientList = document.getElementById('inventory-list');
    const inventoryInput = document.getElementById('inventory-item');

    // A new recipe name is entered via pressing Enter key
    recipeInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            // Add the new recipe to the list
            const recipeName = capitalizeFirstLetter(recipeInput.value);
            recipeInput.value = '';
            console.log(recipeName);
            // Display ingredient card
            const ingredientCard = document.getElementById('ingredient-card');
            ingredientCard.classList.remove('hidden');
            ingredientCard.classList.add('active');
            // Create a recipe item to be added to the JSON database
            const recipeItem = {
                name: recipeName,
                ingredients: []
            };
            const saveButton = document.getElementById('save-recipe');
            saveButton.addEventListener('click', function () {
                // Save the recipe item to the JSON database
                console.log('Saving recipe:', recipeItem);
                // Here you would typically send the recipeItem to your server to be saved
                // For example, using fetch or XMLHttpRequest
                fetch('/recipe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(recipeItem)
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Recipe saved successfully');
                        renderRecipes(); // Refresh the recipe list
                    } else {
                        console.error('Error saving recipe:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error saving recipe:', error);
                });
                // Remove the ingredient card after saving
                ingredientCard.classList.remove('active');
                ingredientCard.classList.add('hidden');
            });
            const ingredientInput = document.getElementById('ingredient-name');
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    // Add the new ingredient to the recipe item
                    if (ingredientInput.value.trim() === '') {
                        console.log('Ingredient input is empty');
                        return; // Do not add empty ingredients
                    }
                    const ingredientName = capitalizeFirstLetter(ingredientInput.value);
                    ingredientInput.value = '';
                    console.log(ingredientName);
                    // Add the ingredient to the recipe item
                    recipeItem.ingredients.push(ingredientName);
                    console.log(recipeItem);
                }
            });
            // event.preventDefault();
            // console.log('Enter key pressed');

        }
    });

    inventoryInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const ingredientName = capitalizeFirstLetter(inventoryInput.value);
            inventoryInput.value = '';
            console.log(ingredientName);
            const newInventoryItem = {
                name: ingredientName
            };
            fetch('/inventory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newInventoryItem)
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Inventory item saved successfully');
                        renderInventory(); // Refresh the inventory list
                    } else {
                        console.error('Error saving inventory item:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error saving inventory item:', error);
                });
        }
    });
    renderRecipes();
    renderInventory();
}

document.addEventListener('DOMContentLoaded', start);