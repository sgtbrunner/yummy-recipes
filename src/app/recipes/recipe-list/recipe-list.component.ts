import { Component } from "@angular/core";
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFYFD4CiAp8OgjotJ2m9J3qgeuzY42tMRDFMxk6fVJowAfH6h_"
    ),
  ];
}
