import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  @Output() routeSelected = new EventEmitter<string>();
  recipeRoute: string = 'recipes';
  shoppingListRoute: string = 'shopping-list';

  setRoute(route: string) {
    this.routeSelected.emit(route);
  }
}
