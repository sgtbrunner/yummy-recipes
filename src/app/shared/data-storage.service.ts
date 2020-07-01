import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { AppConstants } from "./constants/app-constants";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private readonly http: HttpClient,
              private readonly recipeService: RecipeService) {
   }

  storeRecipes(id?: string) {
    const table = this.getTable(id);
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put(AppConstants.DATABASE_URL + table, recipes)
  }

  retrieveRecipes(id?: string) {
    const table = this.getTable(id);
    return this.http
      .get<Recipe[]>(AppConstants.DATABASE_URL + table)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        catchError(error => { return [] }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }

  private getTable(id?: string): string {
    return id ? id + ".json" : AppConstants.RECIPES_TABLE;
  }
}
