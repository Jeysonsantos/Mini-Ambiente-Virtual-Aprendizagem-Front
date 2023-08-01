import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  constructor(private Router:Router, public authService: AuthService) {
  }

  home(): void {
    this.Router.navigate(['/home']);
  }

}
