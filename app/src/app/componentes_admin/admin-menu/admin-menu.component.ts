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
    opcao1() {
      // Implemente a ação da opção 1
      console.log('Opção 1 selecionada.');

    }
  
    Desconectar() {
      
      this.authService.logout();
      this.Router.navigate(['/login']);
      console.log('Opção 2 selecionada.');

    }
}
