import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http"
import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/share.module";
import { CoreModule } from "./core.module";
import { AuthenticationModule } from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ErrorPageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    AppRoutingModule,
    CoreModule,
    AuthenticationModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
