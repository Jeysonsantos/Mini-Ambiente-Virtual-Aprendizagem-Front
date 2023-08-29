import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from 'src/app/models/Disciplina';

@Injectable({
  providedIn: 'root'
})
export class AdminDisciServiceService {

  apiUrl = 'http://localhost:8080/admin'; 

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  verificarCodigoExistente(codigo: string): Observable<boolean> {
    const url = `${this.apiUrl}/disciplina/checkCodigoExists/${codigo}`;
    return this.http.get<boolean>(url);
  }

  salvarDisciplina(disciplina: Disciplina) {
    return this.http.post(this.apiUrl + "/disciplina/create", disciplina);
  }

  editarDisciplina(disciplina: Disciplina) {
    return this.http.put(this.apiUrl + "/disciplina/update", disciplina);
  }

  getDisciplinas() {
    const url = `${this.apiUrl}/disciplina/all`;
    return this.http.get<Disciplina[]>(url);
  }
  excluirDisciplina(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/disciplina/delete/${id}`);
  }
}
