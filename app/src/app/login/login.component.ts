import { Component } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false;
  invalidLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.isAuthenticated = true;
        this.router.navigate(['/home']);
    }
  }

  login(): void {
    this.authService.login(this.username, this.password);
    if (this.authService.isAuthenticatedUser()) {
      this.isAuthenticated = true;
      this.router.navigate(['/home']);
    } else {
      this.invalidLogin = true;
      setTimeout(() => {
        this.invalidLogin = false;
      }, 3000);
    }
    }
  }
