import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private authToken: string = '';
  private authTokenCookieName = 'authToken';

  constructor() {}

  login(username: string, password: string): void {
    // Aqui você implementaria a lógica de autenticação
    // Enviaria uma solicitação HTTP para o servidor com as credenciais do usuário
    // e receberia um token de autenticação em resposta

    // Simulação simples de autenticação bem-sucedida
    if (username === 'usuario' && password === 'senha') {
      this.isAuthenticated = true;
      this.authToken = 'token_de_autenticacao';
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.authToken = '';
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getAuthToken(): string {
    return this.authToken;
  }
}
