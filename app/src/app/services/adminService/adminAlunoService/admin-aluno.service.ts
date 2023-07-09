import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface Aluno {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  matricula: string;
  telefone: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class AdminAlunoService {

  private apiUrl = 'http://localhost:8080/admin'; 

  constructor(private http: HttpClient) {}

  verificarMatriculaExistente(matricula: string): Observable<boolean> {
    const url = `${this.apiUrl}/aluno/checkMatriculaExists/${matricula}`;
    return this.http.get<boolean>(url);
  }

  verificarCpfExistente(cpf: string): Observable<boolean> {
    const url = `${this.apiUrl}/aluno/checkCpfExists/${cpf}`;
    return this.http.get<boolean>(url);
  }

  verificarRgExistente(rg: string): Observable<boolean> {
    const url = `${this.apiUrl}/aluno/checkRgExists/${rg}`;
    return this.http.get<boolean>(url);
  }

  verificarTelefoneExistente(telefone: string): Observable<boolean> {
    const url = `${this.apiUrl}/aluno/checkTelefoneExists/${telefone}`;
    return this.http.get<boolean>(url);
  }
  verificarEmailExistente(email: string): Observable<boolean> {
    const url = `${this.apiUrl}/aluno/checkEmailExists/${email}`;
    return this.http.get<boolean>(url);
  }

  salvarAluno(aluno: Aluno): Observable<any> {
    const url = `${this.apiUrl}/aluno/create`;
    return this.http.post<any>(url, aluno);
  }

  getAlunos() {
    const url = `${this.apiUrl}/aluno/all`;
    return this.http.get<any>(url);
  }
}
