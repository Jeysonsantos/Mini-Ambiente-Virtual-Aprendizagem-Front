import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {
  userType: string = '';
  userName: string = '';
  id_usuario: number = 0;
  
    constructor(private authService: AuthService, private Router: Router) { 
      this.userType = this.authService.getUserType();
      this.userName = this.authService.getUserName();
      this.id_usuario = this.authService.getIdUsuario();
    }
    home() {
      this.Router.navigate(['/home']);
    }
    navigateToAlunos() {
      this.Router.navigate(['/admin/alunos']);
    }

    navigateToCursos() {
      this.Router.navigate(['/admin/cursos']);
    }

    navigateToProfessores() {
      this.Router.navigate(['/admin/professores']);
    }
  
    Desconectar() {
      this.authService.logout();
      this.Router.navigate(['/login']);
      console.log('Opção 2 selecionada.');
    }
}
