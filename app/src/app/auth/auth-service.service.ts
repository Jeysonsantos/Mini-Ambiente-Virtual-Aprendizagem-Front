import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface AutenticarUsuario {
  idUsuario: number;
  tipoUsuario: string;
  nome: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private isAuthenticated: boolean = false;
  private userType: string = '';
  private id_usuario: number = 0;
  private userName: string = '';

  constructor(private httpClient:HttpClient,private router:Router) {}

  login(usuario: string, senha: string): void {
    
    this.httpClient.post<AutenticarUsuario>('http://localhost:8080/login', {usuario, senha}).subscribe((data:AutenticarUsuario)=>{
      if(data){
        console.log(data);
        this.isAuthenticated = true;
        this.userType = data.tipoUsuario;
        this.id_usuario = data.idUsuario;
        this.userName = data.nome;
        this.router.navigate(['/home']);
      }else{
        console.log(data);
        this.isAuthenticated = false;
        this.userType = '';
        this.id_usuario = 0;
        this.userName = '';
      }
    }
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userType = '';
    this.id_usuario = 0;
    this.userName = '';
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getUserType(): string {
    return this.userType;
  }

  getIdUsuario(): number {
    return this.id_usuario;
  }

  getUserName(): string {
    return this.userName;
  }
  isAdmin(): boolean {
    if(this.userType === 'Admin'){
      return true;
    }else{
      return false;
    }
  }
  
}
