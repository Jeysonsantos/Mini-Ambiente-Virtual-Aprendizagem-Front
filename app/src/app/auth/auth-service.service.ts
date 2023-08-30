import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataServiceService } from '../services/adminService/userDataService/user-data-service.service';

interface AutenticarUsuario {
  idUsuario: number;
  tipoUsuario: string;
  nome: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private userDataService: UserDataServiceService) {
  }

  async login(usuario: string, senha: string): Promise<boolean> {
    try {
      const data = await this.httpClient.post<AutenticarUsuario>('http://localhost:8080/login', {
        usuario,
        senha
      }).toPromise();

      if (data) {
        this.userDataService.setUserData(true, data.tipoUsuario, data.idUsuario, data.nome);
        return true;
      } else {
        this.userDataService.setUserData(false, '', 0, '');
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer o login:', error);
      throw error;
    }
  }

  logout(): void {
    this.userDataService.setUserData(false, '', 0, '');
  }
}
