import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private readonly shoppingListService: ShoppingListService) {};
  ingredients: Ingredient[];
  private subscription: Subscription;

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
