import { Component, ViewChild, ElementRef } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})

export class ShoppingEditComponent {
  constructor(private readonly shoppingListSerice: ShoppingListService) {}
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  onAddIngredient() {
    const ingredientName = this.nameInput.nativeElement.value;
    const ingredientAmount = this.amountInput.nativeElement.value;
    const ingredient = new Ingredient(ingredientName,ingredientAmount);
    this.shoppingListSerice.addIngredient(ingredient);
  }
}
