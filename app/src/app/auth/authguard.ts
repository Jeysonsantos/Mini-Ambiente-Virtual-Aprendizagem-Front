import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';
import { UserDataServiceService } from '../services/adminService/userDataService/user-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userDataService: UserDataServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.userDataService.isAuthenticatedUser) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

