import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataServiceService } from '../services/adminService/userDataService/user-data-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  id_usuario: number = 0;

  constructor(private router: Router,public userDataService:UserDataServiceService) { 
  }

  NgOnInit(): void {
    this.id_usuario = this.userDataService.idUsuario;

  }
  home(): void {
    this.router.navigate(['/home']);
  }

}
