import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disciplina } from 'src/app/models/Disciplina';

@Injectable({
  providedIn: 'root'
})
export class ProfCursosService {

  apiUrl = 'http://localhost:8080/professor'; 

  constructor(private http: HttpClient) {}

  getCursosByProfessorId(professorId: number) {
    const url = `${this.apiUrl}/disciplina/allByProfessor/${professorId}`;
    return this.http.get<Disciplina[]>(url);
  }
  

  editarDisciplina(disciplina: Disciplina) {
    return this.http.put(this.apiUrl + "/disciplina/update", disciplina);
  }

}
