import { AlunoService } from './../services/alunoService/aluno.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email: string = '';

  constructor(private Router:Router, public authService: AuthService, public AlunoService: AlunoService) {
    this.email = this.authService.getEmail();
  }
  home(): void {
    this.Router.navigate(['/home']);
  }

}
