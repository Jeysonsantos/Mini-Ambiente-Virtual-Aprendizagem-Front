import { UserDataServiceService } from './../services/adminService/userDataService/user-data-service.service';
import { AlunoService } from './../services/alunoService/aluno.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private Router:Router, public userDataService:UserDataServiceService, public AlunoService: AlunoService) {
  }
  home(): void {
    this.Router.navigate(['/home']);
  }


}
