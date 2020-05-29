import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/share.module";
import { CoreModule } from "./core.module";

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
    SharedModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
