import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service.service';
import { UserDataServiceService } from 'src/app/services/adminService/userDataService/user-data-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  userType: string = '';
  userName: string = '';
  id_usuario: number = 0;
  
    constructor(private userDataService: UserDataServiceService, private router: Router) { 
      this.userType = this.userDataService.UserType;
      this.userName = this.userDataService.UserName
      this.id_usuario = this.userDataService.idUsuario;
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
