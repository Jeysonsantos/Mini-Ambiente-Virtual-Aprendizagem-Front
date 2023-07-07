import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

constructor(private router:Router,public auth:AuthService) { }

  home() {

  }
}


