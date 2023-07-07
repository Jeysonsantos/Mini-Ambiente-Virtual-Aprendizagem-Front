import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  userType: string = '';
  userName: string = '';
  id_usuario: number = 0;
  
    constructor(private authService: AuthService, private router: Router) { 
      this.userType = this.authService.getUserType();
      this.userName = this.authService.getUserName();
      this.id_usuario = this.authService.getIdUsuario();
    }
  navigateToAlunos(): void {
    this.router.navigate(['/admin/alunos']);
  }

  navigateToCursos(): void {
    this.router.navigate(['/admin/cursos']);
  }

  navigateToProfessores(): void {
    this.router.navigate(['/admin/professores']);
  }
}
