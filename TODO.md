# TODO

Recipes will be saved on the server.

DONE: When the server starts up: read the file of recipes from disk and load them into memory.

## Recipes API:

DONE: GET /recipes -> returns all recipes
1. Return the list of recipes as it appears in memory.

TODO: GET /recipes?query=pot -> returns all recipes with an ingredient that matches (e.g. "Potato")
1. Iterate the list of recipes in memory and if a recipe matches the ingredient query, put it in the result list.
2. Return the list of matches.
3. Need to make case-insensitive and substring matching

POST /recipes -> creates a new recipe. Maybe checks to make sure there isn't one with this name already.
1. Add the new recipe to the list of recipes we have in memory.
2. Write the list of recipes out to the file so it's saved.

PUT /recipe -> update a recipe. Maybe updates the list of ingredients.
1. Find the recipe with the name we're updating.
2. Update it in the list of recipes in memory.
3. Write the list of recipes out to the file so it's saved.

