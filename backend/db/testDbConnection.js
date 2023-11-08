const { insertRecipe } = require('./db.js');

const dummyRecipe = {
    meals: [{
        strMeal: "Test Meal",
        strIngredient1: "Test Ingredient",
        strInstructions: "Test Instructions",
        strMealThumb: "https://example.com/test-image.jpg"
    }]
};

async function testConnection() {
    try {
        await insertRecipe(dummyRecipe);
        console.log("Dummy recipe inserted successfully!");
    } catch (error) {
        console.error("Error inserting dummy recipe:", error);
    }
}

testConnection();
