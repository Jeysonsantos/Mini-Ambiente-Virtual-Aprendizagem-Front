import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Aluno } from 'src/app/models/Aluno';
import { Anexo } from 'src/app/models/Anexo';
import { Atividade } from 'src/app/models/Atividade';
import { Disciplina } from 'src/app/models/Disciplina';
import { DisciplinaAluno } from 'src/app/models/DisciplinaAluno';
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

  uploadFile(file: File, id_atividade: number, id_postagem: number,id_disciplina: number): Observable<any> {
    const url = `${this.apiUrl}/disciplina/${id_disciplina}/postagens/${id_postagem}/${id_atividade}/upload`;
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(url, formData);
  }

  getAnexosByDisciplinaId(id_disciplina: number): Observable<Anexo[]> {
    const url = `${this.apiUrl}/disciplina/${id_disciplina}/anexos`;
    return this.http.get<Anexo[]>(url);
    
  }

  vincular_alunos_curso(id_disciplina: number, alunos: Aluno[]): Observable<any> {
    const url = `${this.apiUrl}/disciplina/${id_disciplina}/vincularAlunos`;
    return this.http.post(url, alunos);
  }

  remover_aluno_curso(id_disciplina : number,id_aluno:number){
    const url = `${this.apiUrl}/disciplina/${id_disciplina}/desvincularAluno/${id_aluno}`;
    return this.http.delete(url);

  }

  getAlunosByDisciplinaId(id_disciplina: number): Observable<Aluno[]> {
    const url = `${this.apiUrl}/disciplina/${id_disciplina}/alunos`;
    return this.http.get<Aluno[]>(url);
  }

  getAllDisciplinaAlunoByAluno_Id(id_aluno: number): Observable<DisciplinaAluno[]> {
    const url = `${this.apiUrl}/disciplina/aluno/${id_aluno}`;
    return this.http.get<DisciplinaAluno[]>(url);
  }

  getAtividadeByPostagemId(id_postagem: number): Observable<Atividade> {
    const url = `${this.apiUrl}/disciplina/postagens/${id_postagem}/atividade`;
    return this.http.get<Atividade>(url);
  }

  getAtividadeById(id_atividade: number): Observable<Atividade> {
    const url = `${this.apiUrl}/disciplina/postagens/atividade/${id_atividade}`;
    return this.http.get<Atividade>(url);
  }
  
}
