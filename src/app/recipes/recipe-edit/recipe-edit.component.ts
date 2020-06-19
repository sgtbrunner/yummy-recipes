import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipeForm: FormGroup;
  editMode: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly recipeService: RecipeService,
              private readonly authenticationService: AuthService,
              private readonly dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  get ingredientsControl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

  onSubmit(): void {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onSaveData();
    this.onNavigateAway();
  }

  onSaveData() {
    const storedUserInformation = JSON.parse(this.authenticationService.retrieveStoredUser());
    if (!this.isAuthenticated || storedUserInformation.id === environment.MASTER_USER_ID) {
      this.dataStorageService.storeRecipes();
    } else {
      this.dataStorageService.storeRecipes(storedUserInformation.id);
    }
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'unit': new FormControl(null)
      })
    )
  }

  onDeleteIngredient(id: number): void {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
  }

  onDeleteAllIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  onNavigateAway(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm(): void {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipePreparationTime = '';
    let recipeServes = 0;
    let recipeIngredients = new FormArray([]);
    let recipeInstructions = '';
    let recipeDifficulty = '';

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      recipePreparationTime = recipe.preparationTime;
      recipeServes = recipe.serves;
      recipeDifficulty = recipe.difficulty;
      if(recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)]),
              'unit': new FormControl(ingredient.unit)
            })
          )
        }
      }
      recipeInstructions = recipe.instructions;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'preparationTime': new FormControl(recipePreparationTime, Validators.required),
      'serves': new FormControl(recipeServes, Validators.required),
      'difficulty': new FormControl(recipeDifficulty, Validators.required),
      'ingredients': recipeIngredients,
      'instructions': new FormControl(recipeInstructions, Validators.required)
    })
  }

}
