import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminAlunoDialogComponent } from './admin-aluno-dialog/admin-aluno-dialog.component';
import { AdminAlunoService } from 'src/app/services/adminService/adminAlunoService/admin-aluno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Aluno } from 'src/app/models/Aluno';
import { AdminAlunoExcluirDialogComponent } from './admin-aluno-excluir-dialog/admin-aluno-excluir-dialog/admin-aluno-excluir-dialog.component';


@Component({
  selector: 'app-admin-alunos',
  templateUrl: './admin-alunos.component.html',
  styleUrls: ['./admin-alunos.component.scss']
})
export class AdminAlunosComponent {
  alunos: Aluno[] = [];
  displayedColumns: string[] = ['nome', 'matricula','cpf','acoes'];

  searchText: string = '';

  constructor(private dialog: MatDialog, private AdminalunoService:AdminAlunoService,private snackBar: MatSnackBar) {}
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
      (alunos:Aluno[]) => {
        this.alunos = alunos;
        console.log(this.alunos);

      },
      (error) => {
        console.error('Erro ao carregar alunos:', error);
      }
    );
  }

  adicionarAluno(): void {
    const dialogRef = this.dialog.open(AdminAlunoDialogComponent, {
      width: '500px',
      data: { mode: 'adicionar', aluno: {} as Aluno },
    });
    dialogRef.afterClosed().subscribe((aluno: Aluno) => {
      if (aluno) {
        this.AdminalunoService.salvarAluno(aluno).subscribe(
          (alunoSalvo: any) => {
            this.snackBar.open('Aluno salvo com sucesso.', 'Fechar', { duration: 3000 });
            this.alunos.push(alunoSalvo)
          },
          (error) => {
            console.error('Erro ao salvar aluno:', error);
          }
        );
      }
    });
  }

  editarAluno(aluno:Aluno): void {
    const dialogRef = this.dialog.open(AdminAlunoDialogComponent, {
      width: '500px',
      data: { mode: 'editar', aluno: { ...aluno} }
    });

    dialogRef.afterClosed().subscribe((aluno: Aluno) => {
      if (aluno) {
        const index = this.alunos.findIndex((a) => a.id_aluno === aluno.id_aluno);
        if(index!==-1){
          this.alunos[index] = aluno;
          this.AdminalunoService.editarAluno(aluno).subscribe(  
            (alunoEditado: any) => {
              this.snackBar.open('Aluno editado com sucesso.', 'Fechar', { duration: 3000 });
              this.alunos[index] = alunoEditado;
            
            });
        }
      }
      
    });
  }
  excluirAluno(aluno: Aluno): void {
    const dialogRef = this.dialog.open(AdminAlunoExcluirDialogComponent, {
      width: '300px',
      data: { mode: 'excluir', aluno: { ...aluno } },
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.AdminalunoService.excluirAluno(aluno.id_aluno).subscribe(
          () => {
            this.snackBar.open('Aluno excluído com sucesso.', 'Fechar', { duration: 3000 });
            this.carregarAlunos();
          },
          (error) => {
            console.error('Erro ao excluir aluno:', error);
            this.snackBar.open('Erro ao excluir aluno.', 'Fechar', { duration: 3000 });
          }
        );
      }
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
