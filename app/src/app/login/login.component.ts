import { FeatureSelectorComponent } from './../feature-selector/feature-selector.component';
import { UserDataServiceService } from './../services/adminService/userDataService/user-data-service.service';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Features } from '../models/features';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '264.310.987-22';
  password: string = '26422';
  invalidLogin: boolean = false;
  features : Features = {} as Features;

  constructor(private dialog: MatDialog,public authService: AuthService, private router: Router, private snackBar: MatSnackBar,private userDataService:UserDataServiceService) {
    this.features.agendamentoAtivo = this.authService.agendamentoAtivo;
    this.features.postagemAnexosAtiva = this.authService.postagemAnexosAtiva;
    this.features.criarSecretariaAtiva = this.authService.criarSecretariaAtiva;
    this.features.criarMonitorAtiva = this.authService.criarMonitorAtiva;
  }

  async login(): Promise<void> {
    try {
      this.username = this.removerPontoeTracoeEspacovazio(this.username);
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

  removerPontoeTracoeEspacovazio(texto: string): string {
    return texto.replace(/\.|-|\s/g, '');
  }
  openFeatureSelectorDialog(): void {
    const dialogRef = this.dialog.open(FeatureSelectorComponent, {
      width: '500px', // Defina a largura desejada para o diálogo
      data: {
        mode: false,
        features: this.features
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.agendamentoAtivo = result.agendamentoAtivo;
        this.authService.postagemAnexosAtiva = result.postagemAnexosAtiva;
        this.authService.criarMonitorAtiva = result.criarMonitorAtiva;
        this.authService.criarSecretariaAtiva = result.criarSecretariaAtiva;
        this.features = result;
      }
    });
  }
}
