import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') shoppingListForm: NgForm;
  emptyShoppingListForm: boolean = true;
  subscription: Subscription;
  editMode: boolean = false;
  editedItem: Ingredient;
  editedItemId: number;

  constructor(private readonly shoppingListSerice: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListSerice.startedEditing.subscribe(
      (id: number) => {
        this.editedItemId = id;
        this.editMode = true;
        this.editedItem = this.shoppingListSerice.getIngredient(id);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          unit: this.editedItem.unit ?? ""
        })
      }
    )
  }

  onAddOrUpdateIngredient(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount, value.unit);
    if (!this.editMode) {
      this.shoppingListSerice.addIngredient(newIngredient);
    } else {
      this.shoppingListSerice.updateIngredient(this.editedItemId, newIngredient);
    }
    this.onClearForm();
  }

  onDeleteIngredient() {
    this.shoppingListSerice.deleteIngredient(this.editedItemId);
    this.onClearForm();
  }

  onClearForm() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
