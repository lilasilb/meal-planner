function start() {
    console.log('Page loaded');


    // Recipe input
    const recipeList = document.getElementById('recipe-list');
    const input = document.getElementById('recipe-name');
    console.log(input);

    // A new recipe name is entered via pressing Enter key
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const recipeName = input.value;
            input.value = '';
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