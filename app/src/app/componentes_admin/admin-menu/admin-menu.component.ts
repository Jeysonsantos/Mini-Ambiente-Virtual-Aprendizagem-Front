import { Component } from '@angular/core';
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
  
    constructor(private authService: AuthService) { 
      this.userType = this.authService.getUserType();
      this.userName = this.authService.getUserName();
      this.id_usuario = this.authService.getIdUsuario();
    }
}
