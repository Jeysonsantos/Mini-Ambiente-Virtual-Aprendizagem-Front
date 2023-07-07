import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  url = 'http://localhost:8080/aluno';
  constructor(private HttpClient:HttpClient) { }

  salvarAluno(aluno: any) {
    return this.HttpClient.post(this.url + "/create", aluno);
  }

  obterAlunos() {
    return this.HttpClient.get(this.url + "/all");
  }
}
