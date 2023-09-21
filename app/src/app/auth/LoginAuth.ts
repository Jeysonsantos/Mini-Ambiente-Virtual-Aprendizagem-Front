import { UserDataServiceService } from './../services/adminService/userDataService/user-data-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private userDataService: UserDataServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userDataService.isAuthenticatedUser) {
      this.router.navigate(['/home']);
      return true;
    } 
    else {
      return true;
    }
}
}