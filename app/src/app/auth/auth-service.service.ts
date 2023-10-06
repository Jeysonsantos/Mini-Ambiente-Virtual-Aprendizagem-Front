import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataServiceService } from '../services/adminService/userDataService/user-data-service.service';

interface AutenticarUsuario {
  idUsuario: number;
  tipoUsuario: string;
  nome: string;
}
interface SelecionarFeatures{
  agendamentoAtivo: boolean;
  postagemAnexosAtiva: boolean;
  criarSecretariaAtiva: boolean;
  criarMonitorAtiva: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  agendamentoAtivo: boolean = true;
  postagemAnexosAtiva: boolean = true;
  criarSecretariaAtiva: boolean = false;
  criarMonitorAtiva: boolean = false;

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
        this.userDataService.setFeatures(this.agendamentoAtivo,this.postagemAnexosAtiva,this.criarSecretariaAtiva,this.criarMonitorAtiva);
        return true;
      } else {
        this.userDataService.setUserData(false, '', 0, '');
        this.userDataService.setFeatures(true,true,true,true)
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer o login:', error);
      throw error;
    }
  }

  logout(): void {
    this.userDataService.setUserData(false, '', 0, '');
    this.userDataService.setFeatures(true,true,true,true)
  }
}
