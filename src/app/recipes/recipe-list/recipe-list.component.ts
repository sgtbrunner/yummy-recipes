import { Component, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "This is simply delicious!",
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg"
    ),
    new Recipe(
      "Another Test Recipe",
      "This is sooo yummy!",
      "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/nachos_92445_16x9.jpg"
    ),
  ];

  @Output() selectedRecipe = new EventEmitter<Recipe>()

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
