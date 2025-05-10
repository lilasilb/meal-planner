function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function start() {
    console.log('Page loaded');


    // Recipe input
    const recipeList = document.getElementById('recipe-list');
    const recipeInput = document.getElementById('recipe-name');

    // A new recipe name is entered via pressing Enter key
    recipeInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const recipeName = capitalizeFirstLetter(recipeInput.value);
            recipeInput.value = '';
            console.log(recipeName);
            newRecipeItem = document.createElement('li');
            newRecipeItem.textContent = recipeName;
            recipeList.appendChild(newRecipeItem);
            // event.preventDefault();
            // console.log('Enter key pressed');
        }
    });

    recipeInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const recipeName = capitalizeFirstLetter(recipeInput.value);
            recipeInput.value = '';
            console.log(recipeName);
            newRecipeItem = document.createElement('li');
            newRecipeItem.textContent = recipeName;
            recipeList.appendChild(newRecipeItem);
            // event.preventDefault();
            // console.log('Enter key pressed');
        }
    });
}

document.addEventListener('DOMContentLoaded', start);