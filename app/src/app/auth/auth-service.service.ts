import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isAuthenticated: boolean = false;
  private authToken: string = '';
  private userType: string = '';

  constructor(private httpClient:HttpClient) {}

  login(username: string, password: string): void {
    // Aqui você implementaria a lógica de autenticação
    // Enviaria uma solicitação HTTP para o servidor com as credenciais do usuário
    // e receberia um token de autenticação em resposta
    this.httpClient.post('http://localhost:4000/login', {username:username, password:password}).subscribe((data:any)=>{
      if(data.success){
        this.isAuthenticated = true;
        this.authToken = data.token;
        this.userType = data.userType;
      }else{
        this.isAuthenticated = false;
        this.authToken = '';
        this.userType = '';
      }
    }
    );

    // Simulação simples de autenticação bem-sucedida
    if (username === 'usuario' && password === 'senha') {
      this.isAuthenticated = true;
      this.authToken = "token_de_autenticacao";
      this.userType = "aluno";
    }


  }

  logout(): void {
    this.isAuthenticated = false;
    this.authToken = '';
    this.userType = '';
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getAuthToken(): string {
    return this.authToken;
  }

  getUserType(): string {
    return this.userType;
  }
}
