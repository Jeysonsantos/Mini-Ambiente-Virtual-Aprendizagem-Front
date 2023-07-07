import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminAlunoDialogComponent } from './admin-aluno-dialog/admin-aluno-dialog.component';
interface Aluno {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  matricula: string;
  telefone: string;
  email: string;
}
@Component({
  selector: 'app-admin-alunos',
  templateUrl: './admin-alunos.component.html',
  styleUrls: ['./admin-alunos.component.scss']
})
export class AdminAlunosComponent {
  alunos: Aluno[] = [
    { id: 1, nome: 'João', matricula: '2021001', cpf: '12345678910', rg: '123456789', telefone: '123456789', email: ''},
    { id: 2, nome: 'Maria', matricula: '2021002', cpf: '12345348910', rg: '124256789', telefone: '124256789', email: ''},
    { id: 3, nome: 'Pedro', matricula: '2021003', cpf: '12345678910', rg: '123456789', telefone: '123456789', email: ''},
  ];
  displayedColumns: string[] = ['nome', 'matricula'];

  searchText: string = '';

  constructor(private dialog: MatDialog) {}

  get filteredAlunos(): Aluno[] {
    return this.alunos.filter(aluno =>
      aluno.nome.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  adicionarAluno(): void {
    this.dialog.open(AdminAlunoDialogComponent, {
      width: '400px',
      data: { mode: 'adicionar' }
    });
  }

  editarAluno(id: number): void {
    this.dialog.open(AdminAlunoDialogComponent, {
      width: '400px',
      data: { mode: 'editar', alunoId: id }
    });
  }
  clearSearchText(): void {
    this.searchText = '';
    this.filterAlunos();
  }
  filterAlunos(): void {
    const filterValue = this.searchText.toLowerCase().trim();
    const filteredAlunos = this.alunos.filter(aluno =>
      aluno.nome.toLowerCase().includes(filterValue)
    );
  }
}
