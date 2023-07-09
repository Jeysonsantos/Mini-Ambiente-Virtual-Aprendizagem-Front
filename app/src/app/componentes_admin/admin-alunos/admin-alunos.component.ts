import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminAlunoDialogComponent } from './admin-aluno-dialog/admin-aluno-dialog.component';
import { AdminAlunoService } from 'src/app/services/adminService/adminAlunoService/admin-aluno.service';
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
  alunos: Aluno[] = [];
  displayedColumns: string[] = ['nome', 'matricula'];

  searchText: string = '';

  constructor(private dialog: MatDialog, private AdminalunoService:AdminAlunoService) {}
  ngOnInit(): void {
    this.carregarAlunos();
  }
  
  get filteredAlunos(): Aluno[] {
    return this.alunos.filter(aluno =>
      aluno.matricula.includes(this.searchText)
    );
  }

  carregarAlunos(): void {
    this.AdminalunoService.getAlunos().subscribe(
      (alunos:any) => {
        this.alunos = alunos;
      },
      (error) => {
        console.error('Erro ao carregar alunos:', error);
      }
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
      aluno.matricula.includes(filterValue)
    );
  }
}
