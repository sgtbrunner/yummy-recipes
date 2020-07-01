import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {
  constructor(private readonly authenticationService: AuthService) {}

  isAuthenticated: boolean;

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.userIsLoggedIn();
  }
}