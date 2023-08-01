import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  id_usuario: number = 0;
  
  constructor(private router: Router, public authService: AuthService) { 
    this.id_usuario = this.authService.getIdUsuario();
  }
  home(): void {
    this.router.navigate(['/home']);
  }
}
