import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth-service.service';
import { UserDataServiceService } from '../services/adminService/userDataService/user-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private userDataService:UserDataServiceService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userType = this.userDataService.UserType; 

    if (userType === 'Admin') {
      this.router.navigate(['/admin']);
      return false;
    } else if (userType === 'professor') {
      this.router.navigate(['/professor']);
      return false;
    } else if (userType === 'aluno') {

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

