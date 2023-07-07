import { AuthService } from 'src/app/auth/auth-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent {
  userType: string = '';
  userName: string = '';

  constructor(private authService: AuthService) {
    this.userType = this.authService.getUserType();
    this.userName = this.authService.getUserName();
  }
}
