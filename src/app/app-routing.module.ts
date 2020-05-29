import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
    { path: 'authentication', loadChildren: './auth/auth.module#AuthenticationModule'},
    // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    // { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}