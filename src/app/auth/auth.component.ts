import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  constructor(private readonly authService: AuthService) {}
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode) {
      this.isLoading = false;
    } else {
      this.authService.signUp(email, password).subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.error = error;
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }
}
