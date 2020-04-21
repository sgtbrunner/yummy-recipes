import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = []

      getIngredients() {
          return this.ingredients;
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients);
      }

      addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach((ingredient: Ingredient) => this.addIngredient(ingredient));
        this.ingredientsChanged.next(this.ingredients);
      }
}