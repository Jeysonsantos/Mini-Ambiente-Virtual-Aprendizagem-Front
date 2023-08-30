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

}
