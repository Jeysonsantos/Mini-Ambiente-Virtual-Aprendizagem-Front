import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { UserDataServiceService } from 'src/app/services/adminService/userDataService/user-data-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-aluno-menu',
  templateUrl: './aluno-menu.component.html',
  styleUrls: ['./aluno-menu.component.scss']
})
export class AlunoMenuComponent {
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
    Desconectar() {
      this.authService.logout();
      this.Router.navigate(['/login']);
    }
    openMenu() {
      if (this.menuTrigger) {
        this.menuTrigger.openMenu();
      }
    }

}
