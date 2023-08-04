import { AuthService } from 'src/app/auth/auth-service.service';
import { Component } from '@angular/core';
import { UserDataServiceService } from 'src/app/services/adminService/userDataService/user-data-service.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent {
  userType: string = '';
  userName: string = '';

  constructor(private authService: AuthService, private userDataService: UserDataServiceService) {
    this.userType = this.userDataService.UserType;
    this.userName = this.userDataService.UserName;
  }
}
