import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminAlunoDialogComponent } from './admin-aluno-dialog/admin-aluno-dialog.component';
import { AdminAlunoService } from 'src/app/services/adminService/adminAlunoService/admin-aluno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Aluno } from 'src/app/models/Aluno';
import { AdminAlunoExcluirDialogComponent } from './admin-aluno-excluir-dialog/admin-aluno-excluir-dialog/admin-aluno-excluir-dialog.component';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { includes } from 'lodash';


@Component({
  selector: 'app-admin-alunos',
  templateUrl: './admin-alunos.component.html',
  styleUrls: ['./admin-alunos.component.scss']
})
export class AdminAlunosComponent {
  alunos: Aluno[] = [];
  displayedColumns: string[] = ['nome', 'matricula','cpf','acoes'];
  alunos_amostra: Aluno[] = [];
  termoBusca: string; 
  searchText: string = '';
  filtrar: FormControl = new FormControl('');
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(private dialog: MatDialog, private AdminalunoService:AdminAlunoService,private snackBar: MatSnackBar) {this.termoBusca = '';}
  ngOnInit(): void {
    this.AdminalunoService.getAlunos().subscribe(
      (alunos:Aluno[]) => {
        this.alunos_amostra = alunos.slice(0, 20);
        console.log(this.alunos_amostra);
      }
    );
    this.carregarAlunos();

    this.filtrar.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(500), // Atraso de 300 ms antes de executar a filtragem
      distinctUntilChanged() // Evita filtragem repetida de termos iguais
    ).subscribe((termo: string) => {
      this.termoBusca = termo;
      this.filtrar_Alunos();
    });
  }

  carregarAlunos(): void {
    this.AdminalunoService.getAlunos().subscribe(
      (alunos:Aluno[]) => {
        this.alunos = alunos;
      },
      (error) => {
        console.error('Erro ao carregar alunos:', error);
      }
    );
  }

  adicionarAluno(): void {
    const dialogRef = this.dialog.open(AdminAlunoDialogComponent, {
      width: '1000px',
      data: { mode: 'adicionar', aluno: {} as Aluno, title: 'Adicionar Aluno' },
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
      width: '1000px',
      data: { mode: 'editar', aluno: { ...aluno}, title: 'Editar Aluno' }
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
  
  filtrar_Alunos(): void {
    const termoBuscaLowerCase = this.termoBusca.toLowerCase();
  
    if (this.termoBusca.trim() !== '') {
      this.alunos_amostra = this.alunos.filter((aluno) => {
        return this.filtrarPorPalavrasChave(aluno, termoBuscaLowerCase);
      }).slice(0, 20);
    } else {
      this.alunos_amostra = this.alunos.slice(0, 20);
    }
  }    
  
  private filtrarPorPalavrasChave(aluno: Aluno, termoBusca: string): boolean {
    const palavrasChave = termoBusca.split(' ');
  
    return palavrasChave.every((palavra) => {
      return (
        includes(aluno.matricula.toLowerCase(), palavra) ||
        includes(aluno.cpf.toLowerCase(), palavra)
      );

    });
  }

  formatarCPF(cpf: string): string {
    if (!cpf) {
      return '';
    }

    // Remover caracteres não numéricos do CPF (caso haja)
    cpf = cpf.replace(/\D/g, '');

    // Aplicar a formatação desejada "xxx.xxx.xxx-xx"
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  
}
