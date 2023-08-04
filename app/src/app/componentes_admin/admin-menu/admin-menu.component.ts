import { UserDataServiceService } from 'src/app/services/adminService/userDataService/user-data-service.service';
import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
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
  @ViewChild('menuTrigger') menuTrigger?: MatMenuTrigger;
  @ViewChild('menuTriggerRef', { read: ElementRef }) menuTriggerRef?: ElementRef;

    constructor(public userDataService: UserDataServiceService, private Router: Router, private authService: AuthService,private renderer: Renderer2) { 

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

    openMenu() {
      if (this.menuTrigger) {
        this.menuTrigger.openMenu();
      }
    }
}
