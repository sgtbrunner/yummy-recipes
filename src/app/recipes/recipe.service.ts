import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class RecipeService {
    selectedRecipe = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
          "The mighty Shakshuka!",
          "A middle-eastern classic!",
          "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg",
          [
            new Ingredient('Garlic clove', 3),
            new Ingredient('Onion', 1),
            new Ingredient('Tomatoes', 4),
            new Ingredient('Red Pepsicum', 1),
            new Ingredient('Green Pepsicum', 1),
            new Ingredient('Pasta Sauce', 2),
            new Ingredient('Egg', 4),
            new Ingredient('Parlsey leaves', 10),
            new Ingredient('Bread', 5)
          ]
        ),
        new Recipe(
          "Chilli con Carne and Nachos :)",
          "Arriba, arriba, arriba!!!",
          "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/nachos_92445_16x9.jpg",
          [
            new Ingredient('Garlic clove', 2),
            new Ingredient('Onion', 1),
            new Ingredient('Tomatoes', 4),
            new Ingredient('Red Pepsicum', 1),
            new Ingredient('Green Pepsicum', 1),
            new Ingredient('Red Kidney Beans (g)', 400),
            new Ingredient('Minced Beef (g)', 500),
            new Ingredient('Sweet Corn (g)', 200),
            new Ingredient('Pasta Sauce', 2),
            new Ingredient('Nachos (g)', 300),
          ]
        ),
      ];

    getRecipes(): Recipe[] {
        return this.recipes;
    }
}