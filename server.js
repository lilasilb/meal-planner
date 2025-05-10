// Create a web server
const fs = require('node:fs');
const express = require('express');
const app = express();

function loadRecipes() {
  try {
    var data = fs.readFileSync('recipes.json', 'utf8');
  } catch (err) {
    console.error(err);
    return;
  }
  return JSON.parse(data);
}

var recipes = loadRecipes();
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

app.get('/recipes', (req, res) => {
  console.log("Query filter: " + req.query.filter);
  if (req.query.filter) {
    var filteredRecipes = filterRecipes(req.query.filter);
    res.json(filteredRecipes);
  } else {
    res.json(recipes);
  }
});



// Listen on a port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






app.use(express.static('public'));