import { AdminDisciServiceService } from './../../services/adminService/adminDisciService/admin-disci-service.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { includes } from 'lodash';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Disciplina } from 'src/app/models/Disciplina';
import { AdminCursosDialogComponent } from './admin-cursos-dialog/admin-cursos-dialog/admin-cursos-dialog.component';
import { AdminCursosExcluirDialogComponent } from './admin-cursos-excluir-dialog/admin-cursos-excluir-dialog/admin-cursos-excluir-dialog.component';

@Component({
  selector: 'app-admin-cursos',
  templateUrl: './admin-cursos.component.html',
  styleUrls: ['./admin-cursos.component.scss']
})
export class AdminCursosComponent {
  disciplinas: Disciplina[] = [];
  displayedColumns: string[] = ['nome', 'codigo','carga_horaria','acoes'];
  disciplinas_amostra: Disciplina[] = [];
  termoBusca: string; 
  searchText: string = '';
  filtrar: FormControl = new FormControl('');
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(private dialog: MatDialog, private AdminDisciService:AdminDisciServiceService,private snackBar: MatSnackBar) {this.termoBusca = '';}
  ngOnInit(): void {
    this.AdminDisciService.getDisciplinas().subscribe( 
      (disciplinas:Disciplina[]) => {
        this.disciplinas_amostra = disciplinas.slice(0, 20);
      }
    );
    this.carregarDisciplinas();
    

    this.filtrar.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((termo: string) => {
      this.termoBusca = termo;
      this.filtrar_Disciplinas();
    });
  }

  carregarDisciplinas(): void {
    this.AdminDisciService.getDisciplinas().subscribe( 
      (disciplinas:Disciplina[]) => {
        this.disciplinas = disciplinas;
      },
      (error) => {
        this.snackBar.open('Erro ao carregar disciplinas.', 'Fechar', { duration: 3000 });
      }
    );
  }

  adicionarDisciplina(): void {
    const dialogRef = this.dialog.open(AdminCursosDialogComponent, { 
      width: '1000px',
      data: { mode: 'adicionar', disciplina: {} as Disciplina, title: 'Adicionar Disciplina' },
    });
    dialogRef.afterClosed().subscribe((disciplina: Disciplina) => {
      if (disciplina) {
        this.AdminDisciService.salvarDisciplina(disciplina).subscribe( 
          (disciplinaSalvo: any) => {
            this.snackBar.open('Disciplina salva com sucesso.', 'Fechar', { duration: 3000 });
            this.ngOnInit();
            
          },
          (error) => {
            this.snackBar.open('Erro ao salvar disciplina.', 'Fechar', { duration: 3000 });
          }
        );
      }
    });
  }

  editarDisciplina(disciplina:Disciplina): void {
    const dialogRef = this.dialog.open(AdminCursosDialogComponent, { 
      width: '1000px',
      data: { mode: 'editar', disciplina: { ...disciplina}, title: 'Editar Disciplina' }
    });

    dialogRef.afterClosed().subscribe((disciplina: Disciplina) => {
      if (disciplina) {
        const index = this.disciplinas.findIndex((a) => a.id_disciplina === disciplina.id_disciplina);
        if(index!==-1){
          this.disciplinas[index] = disciplina;
          this.AdminDisciService.editarDisciplina(disciplina).subscribe(   
            (disciplinaEditado: any) => {
              this.snackBar.open('Disciplina editado com sucesso.', 'Fechar', { duration: 3000 });
              this.disciplinas[index] = disciplinaEditado;
              this.ngOnInit();
            });
        }
      }
      
    });
  }
  excluirDisciplina(disciplina: Disciplina): void {
    const dialogRef = this.dialog.open(AdminCursosExcluirDialogComponent, { 
      width: '300px',
      data: { mode: 'excluir', disciplina: { ...disciplina } },
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.AdminDisciService.excluirDisciplina(disciplina.id_disciplina).subscribe( 
          () => {
            this.snackBar.open('Disciplina excluído com sucesso.', 'Fechar', { duration: 3000 });
            this.ngOnInit();
          },
          (error) => {
            this.snackBar.open('Erro ao excluir disciplina.', 'Fechar', { duration: 3000 });
          }
        );
      }
    });
  }
  
  filtrar_Disciplinas(): void {
    const termoBuscaLowerCase = this.termoBusca.toLowerCase();
  
    if (this.termoBusca.trim() !== '') {
      this.disciplinas_amostra = this.disciplinas.filter((disciplina) => {
        return this.filtrarPorPalavrasChave(disciplina, termoBuscaLowerCase);
      }).slice(0, 20);
    } else {
      this.disciplinas_amostra = this.disciplinas.slice(0, 20);
    }
  }    
  
  private filtrarPorPalavrasChave(disciplina: Disciplina, termoBusca: string): boolean {
    const palavrasChave = termoBusca.split(' ');
  
    return palavrasChave.every((palavra) => {
      return (
        includes(disciplina.codigo.toLowerCase(), palavra) ||
        includes(disciplina.nome.toLowerCase(), palavra) 
      );

    });
  }
}
