import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";
import { ShoppingListIngredient } from "./shopping-list-ingredient";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private readonly shoppingListService: ShoppingListService) {};
  ingredients: ShoppingListIngredient[];
  private subscription: Subscription;

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: ShoppingListIngredient[]) => this.ingredients = ingredients
    );
    this.ingredients.forEach(ingredient => ingredient.isToggled = false );
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }

  onToggle(id: number) {
    this.ingredients[id].isToggled = !this.ingredients[id].isToggled;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
