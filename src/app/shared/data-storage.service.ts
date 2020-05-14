import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { AppConstants } from "./constants/app-constants";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private readonly http: HttpClient,
              private readonly recipeService: RecipeService) {
   }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put(AppConstants.DATABASE_URL + AppConstants.RECIPES_TABLE, recipes)
      .subscribe(response => {
        console.log(response);
      })
  }

  retrieveRecipes() {
    return this.http
      .get<Recipe[]>(AppConstants.DATABASE_URL + AppConstants.RECIPES_TABLE)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
    }
}
