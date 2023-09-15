import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
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
    return this.http.get<Postagem[]>(url,);
  }

  criarPostagem(disciplinaId: number, formData: FormData): Observable<Postagem> {
    const url = `${this.apiUrl}/disciplina/${disciplinaId}/createPostagem`;
    return this.http.post<Postagem>(url, formData);
  }

  criarAtividade(atividade:Atividade): Observable<Atividade> {
    const url = `${this.apiUrl}/disciplina/postagens/atividade/create`;
    return this.http.post<Atividade>(url, atividade);
  }

  uploadFile(file: File, id_atividade: number, id_postagem: number): Observable<any> {
    const url = `${this.apiUrl}/disciplina/postagens/${id_postagem}/${id_atividade}/upload`;
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    
    this.http.post(url, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    return this.http.post(url, formData);
  }

  getAnexosByPostagemId(id_postagem: number): Observable<any> {
    const url = `${this.apiUrl}/disciplina/postagens/${id_postagem}/anexos`;
    return this.http.get(url);
  }
  

}
