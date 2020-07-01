import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { environment } from "src/environments/environment";
import { RecipeService } from "./recipe.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"]
})

export class RecipesComponent implements OnInit {
  constructor(private readonly authenticationService: AuthService,
              private readonly recipeService: RecipeService,
              private readonly dataStorageService: DataStorageService) {}

  isAuthenticated: boolean;
  storedUserInformation: any;

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.userIsLoggedIn();
    this.storedUserInformation = JSON.parse(this.authenticationService.retrieveStoredUser());
    const recipesLoaded = this.checkRecipes();
    if(!recipesLoaded) {
      if(!this.isAuthenticated || this.storedUserInformation.id === environment.MASTER_USER_ID) {
        this.dataStorageService.retrieveRecipes().subscribe();
      } else {
        this.dataStorageService.retrieveRecipes(this.storedUserInformation.id).subscribe();
      }
    }
  }

  checkRecipes(): boolean {
    return !!this.recipeService.getRecipes().length;
  }
}
