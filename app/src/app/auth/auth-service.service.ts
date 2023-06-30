import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface AutenticarUsuario {
  idUsuario: number;
  tipoUsuario: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private isAuthenticated: boolean = false;
  private userType: string = '';

  constructor(private httpClient:HttpClient,private router:Router) {}

  login(usuario: string, senha: string): void {
    
    this.httpClient.post<AutenticarUsuario>('http://localhost:8080/login', {usuario, senha}).subscribe((data:AutenticarUsuario)=>{
      if(data){
        console.log(data);
        this.isAuthenticated = true;
        this.userType = data.tipoUsuario;
        this.router.navigate(['/home']);
      }else{
        console.log(data);
        this.isAuthenticated = false;
        this.userType = '';
      }
    }
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userType = '';
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getUserType(): string {
    return this.userType;
  }
}
