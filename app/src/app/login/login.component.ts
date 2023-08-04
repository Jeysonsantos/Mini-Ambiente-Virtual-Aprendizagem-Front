import { UserDataServiceService } from './../services/adminService/userDataService/user-data-service.service';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = 'admin';
  password: string = 'admin';
  invalidLogin: boolean = false;

  constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar,private userDataService:UserDataServiceService) {}

  async login(): Promise<void> {
    try {
      const loggedIn = await this.authService.login(this.username, this.password);

      if (loggedIn) {
        const userType = this.userDataService.UserType;
        console.log(userType);
        if (userType === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (userType === 'professor') {
          this.router.navigate(['/professor']);
        } else if (userType === 'aluno') {
          this.router.navigate(['/aluno']);
        }
      } else {
        this.invalidLogin = true;
        this.snackBar.open('Usuário ou senha inválidos!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    } catch (error) {
      this.invalidLogin = true;
      this.snackBar.open('Usuário ou senha inválidos!', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
      });
      console.error('Erro ao fazer o login:', error);
    }
  }
}
