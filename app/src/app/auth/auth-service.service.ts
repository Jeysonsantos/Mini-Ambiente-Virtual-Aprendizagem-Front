import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  private email: string = '';

  constructor(private httpClient: HttpClient) {
  }

  async login(usuario: string, senha: string): Promise<boolean> {
    try {
      const data = await this.httpClient.post<AutenticarUsuario>('http://localhost:8080/login', {
        usuario,
        senha
      }).toPromise();

      if (data) {
        this.isAuthenticated = true;
        this.userType = data.tipoUsuario;
        this.id_usuario = data.idUsuario;
        this.userName = data.nome;
        return true;
      } else {
        this.isAuthenticated = false;
        this.userType = '';
        this.id_usuario = 0;
        this.userName = '';
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer o login:', error);
      throw error;
    }
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
    return this.userType === 'Admin';
  }

  getEmail(): string {
    return this.email;
  }
}
