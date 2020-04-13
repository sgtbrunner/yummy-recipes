import { Ingredient } from "../shared/ingredient.model";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    private ingredients: Ingredient[] = []

      getIngredients() {
          return this.ingredients;
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
      }

      addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach((ingredient: Ingredient) => this.addIngredient(ingredient));
      }
}