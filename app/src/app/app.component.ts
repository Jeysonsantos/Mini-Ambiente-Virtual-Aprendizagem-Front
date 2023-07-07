import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  userName: string = '';
  id_usuario: number = 0;
  
  constructor(private router: Router, public authService: AuthService) { 
    this.userName = this.authService.getUserName();
    this.id_usuario = this.authService.getIdUsuario();
  }
}
