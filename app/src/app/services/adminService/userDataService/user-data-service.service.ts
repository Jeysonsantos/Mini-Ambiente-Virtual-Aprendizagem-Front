import { Features } from './../../../models/features';
import { Injectable } from '@angular/core';
import { AlunoService } from '../../alunoService/aluno.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  private isAuthenticated: boolean = false;
  private userType: string = '';
  private id_usuario: number = 0;
  private userName: string = '';

  private agendamentoAtivo: boolean = false;
  private postagemAnexosAtiva: boolean = false;
  private criarSecretariaAtiva: boolean = false;
  private criarMonitorAtiva: boolean = false;

  constructor(private AlunoService:AlunoService) {}

  setUserData(
    isAuthenticated: boolean,
    userType: string,
    id_usuario: number,
    userName: string,
    ): void {
    this.isAuthenticated = isAuthenticated;
    this.userType = userType;
    this.id_usuario = id_usuario;
    this.userName = userName;
  }
  setFeatures(
    agendamentoAtivo: boolean,
    postagemAnexosAtiva: boolean,
    criarSecretariaAtiva: boolean,
    criarMonitorAtiva: boolean,
    ): void {
    this.agendamentoAtivo = agendamentoAtivo;
    this.postagemAnexosAtiva = postagemAnexosAtiva;
    this.criarSecretariaAtiva = criarSecretariaAtiva;
    this.criarMonitorAtiva = criarMonitorAtiva;
  }

  get isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  get UserType(): string {
    return this.userType;
  }

  get idUsuario(): number {
    return this.id_usuario;
  }

  get UserName(): string {
    return this.userName;
  }

  get AgendamentoAtivo(): boolean {
    return this.agendamentoAtivo;
  }

  get PostagemAnexosAtiva(): boolean {
    return this.postagemAnexosAtiva;
  }

  get CriarSecretariaAtiva(): boolean {
    return this.criarSecretariaAtiva;
  }

  get CriarMonitorAtiva(): boolean {
    return this.criarMonitorAtiva;
  }

  get Features(): Features {
    return {
      agendamentoAtivo: this.agendamentoAtivo,
      postagemAnexosAtiva: this.postagemAnexosAtiva,
      criarSecretariaAtiva: this.criarSecretariaAtiva,
      criarMonitorAtiva: this.criarMonitorAtiva,
    };
  }


}
