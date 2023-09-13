import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from 'src/app/models/Disciplina';
import { Postagem } from 'src/app/models/Postagem';

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
  } // não esta sendo usado ainda

  getDisciplinaById(disciplinaId: number) {
    const url = `${this.apiUrl}/disciplina/${disciplinaId}`;
    return this.http.get<Disciplina>(url);
  }

  getPostagens(disciplinaId: number) {
    const url = `${this.apiUrl}/disciplina/${disciplinaId}/postagens`;
    return this.http.get<Postagem[]>(url);
  }

  criarPostagem(disciplinaId: number, formData: FormData) {
    const url = `${this.apiUrl}/disciplina/${disciplinaId}/createPostagem`;
    console.log(this.http.post(url, formData))
    return this.http.post(url, formData);
  }

  uploadFile(file: FileList, disciplinaId:number,postagemId:number): Observable<any> {
    const formData = new FormData();

    for(let i = 0; i < file.length; i++){
      formData.append('file', file[i]);
    }

    const url = `${this.apiUrl}/disciplina/${disciplinaId}/postagens/${postagemId}/upload`;

    return this.http.post(url, formData);
  }
  


}
