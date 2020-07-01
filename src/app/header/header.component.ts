import { Component, OnInit, OnDestroy } from "@angular/core";

import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private readonly authenticationService: AuthService) {}
  
  isAuthenticated: boolean = false;
  private userSub: Subscription;

  ngOnInit() {
    this.userSub = this.authenticationService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
