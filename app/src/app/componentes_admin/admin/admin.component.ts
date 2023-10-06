import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service.service';
import { Features } from 'src/app/models/features';
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
  Features: Features = {} as Features;
  
    constructor(private userDataService: UserDataServiceService, private router: Router,private MatSnackBar:MatSnackBar) { 
      this.userType = this.userDataService.UserType;
      this.userName = this.userDataService.UserName
      this.id_usuario = this.userDataService.idUsuario;
      this.Features = this.userDataService.Features;
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
  navigateToMonitor():void{
    this.MatSnackBar.open('Em desenvolvimento.','Fechar',{duration:3000});
  }
  navigateToSecretaria():void{
    this.MatSnackBar.open('Em desenvolvimento.','Fechar',{duration:3000});
  }
}
