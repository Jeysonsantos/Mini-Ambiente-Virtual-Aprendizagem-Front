import { Component } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = 'admin';
  password: string = 'admin';
  isAuthenticated: boolean = false;
  invalidLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.isAuthenticated = true;
      const userType = this.authService.getUserType();

      if (userType === 'admin') {
        this.router.navigate(['/admin']);
      } else if (userType === 'professor') {
        this.router.navigate(['/professor']);
      } else if (userType === 'aluno') {
        this.router.navigate(['/aluno']);
      }
    }
  }

  login(): void {
    this.authService.login(this.username, this.password);
    if (this.authService.isAuthenticatedUser()) {
      this.isAuthenticated = true;
      const userType = this.authService.getUserType();

      if (userType === 'admin') {
        this.router.navigate(['/admin']);
      } else if (userType === 'professor') {
        this.router.navigate(['/professor']);
      } else if (userType === 'aluno') {
        this.router.navigate(['/aluno']);
      }

    } else {
      this.invalidLogin = true;
      setTimeout(() => {
        this.invalidLogin = false;
      }, 3000);
    }
    }
  }
