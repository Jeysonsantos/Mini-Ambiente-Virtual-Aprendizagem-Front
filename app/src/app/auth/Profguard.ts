import { UserDataServiceService } from './../services/adminService/userDataService/user-data-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfGuard implements CanActivate {
  constructor(private userDataService: UserDataServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userDataService.isAuthenticatedUser && this.userDataService.UserType === 'professor') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}