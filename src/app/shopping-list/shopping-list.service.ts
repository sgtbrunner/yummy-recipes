import { Ingredient } from "../shared/ingredient.model";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10),
    ];

      getIngredients() {
          return this.ingredients;
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
      }
}