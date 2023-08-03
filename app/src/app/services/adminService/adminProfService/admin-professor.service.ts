import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/models/Professor';

@Injectable({
  providedIn: 'root'
})
export class AdminProfessorService {

  apiUrl = 'http://localhost:8080/admin'; 

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  verificarCodigoExistente(codigo: string): Observable<boolean> {
    const url = `${this.apiUrl}/professor/checkCodigoExists/${codigo}`;
    return this.http.get<boolean>(url);
  }

  verificarCpfExistente(cpf: string): Observable<boolean> {
    const url = `${this.apiUrl}/professor/checkCpfExists/${cpf}`;
    return this.http.get<boolean>(url);
  }

  verificarRgExistente(rg: string): Observable<boolean> {
    const url = `${this.apiUrl}/professor/checkRgExists/${rg}`;
    return this.http.get<boolean>(url);
  }

  verificarTelefoneExistente(telefone: string): Observable<boolean> {
    const url = `${this.apiUrl}/professor/checkTelefoneExists/${telefone}`;
    return this.http.get<boolean>(url);
  }
  verificarEmailExistente(email: string): Observable<boolean> {
    const url = `${this.apiUrl}/professor/checkEmailExists/${email}`;
    return this.http.get<boolean>(url);
  }

  salvarProfessor(professor: Professor) {
    return this.http.post(this.apiUrl + "/professor/create", professor);
  }

  editarProfessor(professor: Professor) {
    return this.http.put(this.apiUrl + "/professor/update", professor);
  }

  getProfessores() {
    const url = `${this.apiUrl}/professor/all`;
    return this.http.get<Professor[]>(url);
  }
  excluirProfessor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/professor/delete/${id}`);
  }

}
