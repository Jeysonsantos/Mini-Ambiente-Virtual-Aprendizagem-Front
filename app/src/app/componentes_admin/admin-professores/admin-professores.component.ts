import { AdminProfessorDialogComponent } from './admin-professor-dialog/admin-professor-dialog/admin-professor-dialog.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Professor } from 'src/app/models/Professor';
import { AdminProfessorService } from 'src/app/services/adminService/adminProfService/admin-professor.service';
import { AdminProfessorExcluirDialogComponent } from './admin-professor-excluir-dialog/admin-professor-excluir-dialog/admin-professor-excluir-dialog.component';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { includes } from 'lodash';

@Component({
  selector: 'app-admin-professores',
  templateUrl: './admin-professores.component.html',
  styleUrls: ['./admin-professores.component.scss']
})
export class AdminProfessoresComponent {
  professores: Professor[] = [];
  displayedColumns: string[] = ['nome', 'codigo','cpf','acoes'];

  professores_amostra: Professor[] = [];
  termoBusca: string; 
  searchText: string = '';
  filtrar: FormControl = new FormControl('');
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(private AdminprofessorService:AdminProfessorService,private dialog: MatDialog,private snackBar:MatSnackBar) {this.termoBusca = ''; }

  ngOnInit(): void {
    this.AdminprofessorService.getProfessores().subscribe(
      (professores:Professor[]) => {
        this.professores_amostra = professores.slice(0, 20);
      }
    );
    this.carregarProfessores();

    this.filtrar.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((termo: string) => {
      this.termoBusca = termo;
      this.filtrar_Professores();
    });
  }


  carregarProfessores(): void {
    this.AdminprofessorService.getProfessores().subscribe(
      (professores:Professor[]) => {
        this.professores = professores;
      },
      (error) => {
        console.error('Erro ao carregar professores:', error);
      }
    );
  }

  adicionarProfessor(): void {
    const dialogRef = this.dialog.open(AdminProfessorDialogComponent, {
      width: '1000px',
      data: { mode: 'adicionar', professor: {} as Professor, title: 'Adicionar Professor' },
    });
    dialogRef.afterClosed().subscribe((professor: Professor) => {
      if (professor) {
        this.AdminprofessorService.salvarProfessor(professor).subscribe(
          (professorSalvo: any) => {
            this.snackBar.open('Professor salvo com sucesso.', 'Fechar', { duration: 3000 });
            this.ngOnInit();
          },
          (error) => {
            console.error('Erro ao salvar professor:', error);
          }
        );
      }
    });
  }

  editarProfessor(professor:Professor): void {
    const dialogRef = this.dialog.open(AdminProfessorDialogComponent, {
      width: '1000px',
      data: { mode: 'editar', professor: { ...professor}, title: 'Editar Professor' }
    });

    dialogRef.afterClosed().subscribe((professor: Professor) => {
      if (professor) {
        const index = this.professores.findIndex((a) => a.id_professor === professor.id_professor);
        if(index!==-1){
          this.professores[index] = professor;
          this.AdminprofessorService.editarProfessor(professor).subscribe(  
            (professorEditado: any) => {
              this.snackBar.open('Professor editado com sucesso.', 'Fechar', { duration: 3000 });
              this.professores[index] = professorEditado;
              this.ngOnInit();
            
            });
        }
      }
      
    });
  }
  excluirProfessor(professor: Professor): void {
    const dialogRef = this.dialog.open(AdminProfessorExcluirDialogComponent, {
      width: '300px',
      data: { mode: 'excluir', professor: { ...professor } },
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.AdminprofessorService.excluirProfessor(professor.id_professor).subscribe(
          () => {
            this.snackBar.open('Professor excluído com sucesso.', 'Fechar', { duration: 3000 });
            this.ngOnInit();
          },
          (error) => {
            console.error('Erro ao excluir professor:', error);
            this.snackBar.open('Erro ao excluir professor.', 'Fechar', { duration: 3000 });
          }
        );
      }
    });
  }
  
  
  filtrar_Professores(): void {
    const termoBuscaLowerCase = this.termoBusca.toLowerCase();
  
    if (this.termoBusca.trim() !== '') {
      this.professores_amostra = this.professores.filter((professor) => {
        return this.filtrarPorPalavrasChave(professor, termoBuscaLowerCase);
      }).slice(0, 20);
    } else {
      this.professores_amostra = this.professores.slice(0, 20);
    }
  }    
  
  private filtrarPorPalavrasChave(professor: Professor, termoBusca: string): boolean {
    const palavrasChave = termoBusca.split(' ');
  
    return palavrasChave.every((palavra) => {
      return (
        includes(professor.codigo.toLowerCase(), palavra) ||
        includes(professor.cpf.toLowerCase(), palavra)
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
