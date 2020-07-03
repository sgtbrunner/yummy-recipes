import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { ErrorConstants } from "src/app/shared/constants/error-constants";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly recipeService: RecipeService,
              private readonly authenticationService: AuthService,
              private readonly dataStorageService: DataStorageService) {}
  
  id: number;
  recipe: Recipe;
  error: string = null;
  isAuthenticated: boolean;            

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
    this.isAuthenticated = this.authenticationService.userIsLoggedIn();
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    if(confirm("Are you sure you want to delete this recipe?")) {
      this.recipeService.deleteRecipe(this.id);
      this.onSaveData();
    }
  }

  onSaveData(): void {
    const storedUserInformation = JSON.parse(this.authenticationService.retrieveStoredUser());
    if (!this.isAuthenticated || storedUserInformation.id === environment.MASTER_USER_ID) {
      this.dataStorageService.storeRecipes()
        .subscribe(
          success => this.router.navigate(['/recipes']),
          error => { 
            this.error = ErrorConstants.CLIENT_ERROR_TOO_MANY_ATTEMPTS,
            this.dataStorageService.retrieveRecipes().subscribe();
          }
      );
    } else {
      this.dataStorageService.storeRecipes(storedUserInformation.id)
        .subscribe(
          success => this.router.navigate(['/recipes']),
          error => { 
            this.error = ErrorConstants.CLIENT_ERROR_TOO_MANY_ATTEMPTS,
            this.dataStorageService.retrieveRecipes().subscribe(storedUserInformation.id)
          }
      )
    }
  }

  onHandleError() {
    this.error = null;
  }
}