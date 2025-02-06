const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");

// ✅ Get all recipes (Only show user's recipes)
const getAllRecipes = async (req, res) => {
  const user_id = req.user._id;
  try {
    const recipes = await Recipe.find({ userId: user_id }).sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipes" });
  }
};

// ✅ Get a single recipe (Only if it belongs to the user)
const getRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  try {
    const recipe = await Recipe.findOne({ _id: id, userId: req.user._id });
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
};

// ✅ Create a new recipe
const createRecipe = async (req, res) => {
  const { name, ingredients, instructions, prepTime, difficulty, imageUrl } = req.body;
  let emptyFields = [];

  if (!name) emptyFields.push("name");
  if (!ingredients) emptyFields.push("ingredients");
  if (!instructions) emptyFields.push("instructions");
  if (!prepTime) emptyFields.push("prepTime");
  if (!difficulty) emptyFields.push("difficulty");

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const userId = req.user._id;
    const recipe = await Recipe.create({
      userId,
      name,
      ingredients,
      instructions,
      prepTime,
      difficulty,
      imageUrl,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Error creating recipe" });
  }
};

// ✅ Delete a recipe (Only if it belongs to the user)
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  try {
    const recipe = await Recipe.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!recipe) {
      return res.status(404).json({ error: "No such recipe or not authorized" });
    }

    res.status(200).json({ message: "Recipe deleted successfully", recipe });
  } catch (error) {
    res.status(500).json({ error: "Error deleting recipe" });
  }
};

// ✅ Update a recipe (Only if it belongs to the user)
const updateRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { ...req.body },
      { new: true } // ✅ Ensures the updated document is returned
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: "No such recipe or not authorized" });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Error updating recipe" });
  }
};



module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
};
