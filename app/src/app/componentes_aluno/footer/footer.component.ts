import { AuthService } from './../../auth/auth-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  nome: string = '';
  
  constructor(private AuthService:AuthService) {
    this.nome = this.AuthService.getUserName();
  }

}
