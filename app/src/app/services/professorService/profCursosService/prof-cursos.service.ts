import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atividade } from 'src/app/models/Atividade';
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

  criarPostagem(disciplinaId: number, formData: FormData): Observable<Postagem> {
    const url = `${this.apiUrl}/disciplina/${disciplinaId}/createPostagem`;
    return this.http.post<Postagem>(url, formData);
  }

  criarAtividade(atividade:Atividade): Observable<Atividade> {
    const url = `${this.apiUrl}/disciplina/postagens/atividade/create`;
    return this.http.post<Atividade>(url, atividade);
  }

  uploadFile(file: FileList, id_atividade:number,id_postagem:number): Observable<any> {
    const formData = new FormData();
    

    for(let i = 0; i < file.length; i++){
      formData.append('file', file[i]);
    }
    console.log(formData);

    const url = `${this.apiUrl}/disciplina/postagens/${id_postagem}/${id_atividade}/upload`;

    console.log(url)
    return this.http.post(url, formData);
  }
  


}
