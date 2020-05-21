import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { AppConstants } from "./constants/app-constants";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private readonly http: HttpClient,
              private readonly recipeService: RecipeService,
              private readonly authService: AuthService) {
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
