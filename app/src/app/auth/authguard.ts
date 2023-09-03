import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserDataServiceService } from '../services/adminService/userDataService/user-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userDataService: UserDataServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userDataService.isAuthenticatedUser) {
      this.router.navigate(['/login']);
      return false;
    }else if(this.userDataService.UserType === 'Admin'){
      return true;
    }

    // Obtenha o ID da disciplina a partir dos parâmetros da rota
    const disciplinaId = route.params['id'];

    // Carregue informações do usuário (como disciplinas associadas) do serviço
    const tipo_usuario = this.userDataService.UserType; 
    const id_usuario = this.userDataService.idUsuario;

    // Verifique se o usuário é um professor da disciplina com base no ID
    if (this.isUserProfessorOfDisciplina(tipo_usuario, disciplinaId,id_usuario)) {
      return true;
    } else {
      // Redirecione para uma página de acesso negado ou exiba uma mensagem de erro
      this.router.navigate(['/access-denied']);
      return false;
    }
  }

  private isUserProfessorOfDisciplina(user: String, disciplinaId: string, id_usuario:number): boolean {
    
    if (user === 'professor') {
      return true;
    } else if (user === 'aluno') {
      return false;
    } else {
      return false;
    }
  }
}


