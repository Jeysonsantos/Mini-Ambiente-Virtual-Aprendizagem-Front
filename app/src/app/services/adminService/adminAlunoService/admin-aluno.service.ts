import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface Aluno {
  id_aluno: number;
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

  apiUrl = 'http://localhost:8080/admin'; 

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

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

  salvarAluno(aluno: Aluno) {
    return this.http.post(this.apiUrl + "/aluno/create", aluno);
  }

  editarAluno(aluno: Aluno) {
    return this.http.put(this.apiUrl + "/aluno/update", aluno);
  }

  getAlunos() {
    const url = `${this.apiUrl}/aluno/all`;
    return this.http.get<Aluno[]>(url);
  }
  excluirAluno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/aluno/delete/${id}`);
  }
}
