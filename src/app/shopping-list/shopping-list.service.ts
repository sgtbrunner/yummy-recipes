import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = []

      getIngredients() : Ingredient[] {
          return this.ingredients;
      }

      getIngredient(id: number) : Ingredient {
        return this.ingredients[id];
      }

      addIngredient(ingredient: Ingredient) : void {
        this.ingredients.unshift(ingredient);
        this.ingredientsChanged.next(this.ingredients);
      }

      updateIngredient(id: number, newIngredient: Ingredient) : void {
        this.ingredients[id] = newIngredient;
        this.ingredientsChanged.next(this.ingredients);
      }

      deleteIngredient(id: number) {
        this.ingredients.splice(id, 1);
        this.ingredientsChanged.next(this.ingredients);
      }

      addIngredients(ingredients: Ingredient[]) : void {
        ingredients.forEach((ingredient: Ingredient) => this.addIngredient(ingredient));
        this.ingredientsChanged.next(this.ingredients);
      }
}