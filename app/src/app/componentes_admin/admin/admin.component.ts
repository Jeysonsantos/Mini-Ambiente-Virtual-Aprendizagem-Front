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
  
    constructor(private authService: AuthService, private router: Router) { 
      this.userType = this.authService.getUserType();
      this.userName = this.authService.getUserName();
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