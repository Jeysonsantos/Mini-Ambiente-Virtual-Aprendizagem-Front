import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss']
})
export class AlunoComponent {
  userType: string = '';
  id_usuario: number = 0;
  userName: string = '';

  constructor(private authService: AuthService) { 
    this.userType = this.authService.getUserType();
    this.id_usuario = this.authService.getIdUsuario();
    this.userName = this.authService.getUserName();
  }



}
