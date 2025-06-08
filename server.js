// Create a web server
const fs = require('node:fs');
const express = require('express');
const app = express();

const filename = 'data.json';

function loadData() {
  try {
    var data = fs.readFileSync(filename, 'utf8');
  } catch (err) {
    console.error(err);
    return;
  }
  return JSON.parse(data);
}

function saveData() {
  var toSave = {}
  toSave.recipes = recipes;
  toSave.inventory = inventory;
  fs.writeFileSync(filename, JSON.stringify(toSave, null, 2));
}

var database = loadData();
var recipes = database.recipes || [];
var inventory = database.inventory || [];

console.log(recipes)

function filterRecipes(filter) {
  filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].ingredients.includes(filter)) {
      filteredRecipes.push(recipes[i])
    }
  }
  return filteredRecipes;
}

app.get('/inventory', (req, res) => {
    res.json(inventory);
  });

app.post('/inventory', express.json(), (req, res) => {
  const newInventoryItem = req.body;
  console.log('Received new recipe:', newInventoryItem);

  // Add the new recipe to the recipes array
  inventory.push(newInventoryItem);

  // Save the updated recipes back to the JSON file
  saveData();
  res.status(201).json({ message: 'Recipe saved successfully' });
});

app.get('/recipes', (req, res) => {
  console.log("Query filter: " + req.query.filter);
  if (req.query.filter) {
    var filteredRecipes = filterRecipes(req.query.filter);
    res.json(filteredRecipes);
  } else {
    res.json(recipes);
  }
});

app.post('/recipe', express.json(), (req, res) => {
  const newRecipe = req.body;
  console.log('Received new recipe:', newRecipe);

  // Add the new recipe to the recipes array
  recipes.push(newRecipe);

  // Save the updated recipes back to the JSON file
  saveData();
  res.status(201).json({ message: 'Recipe saved successfully' });
});

// Listen on a port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






app.use(express.static('public'));