import { ProfCursosService } from 'src/app/services/professorService/profCursosService/prof-cursos.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { includes } from 'lodash';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Aluno } from 'src/app/models/Aluno';
import { AdminAlunoService } from 'src/app/services/adminService/adminAlunoService/admin-aluno.service';
import { ProfessorCursoDetalhesComponent } from '../../professor-curso-detalhes/professor-curso-detalhes.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-professor-curso-add-alunos-dialog',
  templateUrl: './professor-curso-add-alunos-dialog.component.html',
  styleUrls: ['./professor-curso-add-alunos-dialog.component.scss']
})
export class ProfessorCursoAddAlunosDialogComponent {
  selectedStudents: Aluno[] = [];
  termoBusca: string = '';
  alunos: Aluno[] = [];
  alunos_amostra: Aluno[] = [];
  filtrar: FormControl = new FormControl('');
  id_disciplina: number;
  matriculadosStudents : Aluno[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>()
  constructor(
    private AdminAlunoService:AdminAlunoService,
    private dialogRef:MatDialogRef<ProfessorCursoDetalhesComponent>,
    private ProfCursosService: ProfCursosService,
    private snackbar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {id_disciplina: number,title: string;
    }
    ) { 
      this.id_disciplina = data.id_disciplina;
    }
  

  ngOnInit(): void {
    this.carregarAlunos();
    this.carregar_alunos_matriculados();

    this.filtrar.valueChanges.pipe(
      debounceTime(1000),
      takeUntil(this.unsubscribe$),
      distinctUntilChanged()
    ).subscribe((termo: string) => {
      this.termoBusca = termo;
      this.filtrar_Alunos();
    });
    
  }

  carregarAlunos(){
    this.AdminAlunoService.getAlunos().subscribe(alunos => {
      this.shuffleArray(alunos);
      this.alunos = alunos;
      this.alunos_amostra = alunos.slice(0, 100);
    });
  }

  shuffleArray(array: Aluno[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  

  filtrar_Alunos(): void {
    const termoBuscaLowerCase = this.termoBusca.toLowerCase();
  
    if (this.termoBusca.trim() !== '') {
      this.alunos_amostra = this.alunos.filter((aluno) => {
        return this.filtrarPorPalavrasChave(aluno, termoBuscaLowerCase);
      }).slice(0, 20);
    } else {
      this.shuffleArray(this.alunos);
      this.alunos_amostra = this.alunos.slice(0, 100);
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

  selectStudent(student: Aluno){
    //verificar se ja esta matriculado
    if(this.matriculadosStudents.find(aluno => aluno.id_aluno == student.id_aluno)){
      this.snackbar.open('Aluno já matriculado!', 'Fechar', { duration: 3000 });
      return;
    }else if(this.selectedStudents.find(aluno => aluno.id_aluno == student.id_aluno)){
      this.snackbar.open('Aluno já selecionado!', 'Fechar', { duration: 3000 });
      return;
    }else{
      this.selectedStudents.push(student);
      this.alunos_amostra = this.alunos_amostra.filter(aluno => aluno.id_aluno != student.id_aluno);
    }
    

  }

  removeSelectedStudent(student:Aluno){
    this.selectedStudents = this.selectedStudents.filter(aluno => aluno.id_aluno != student.id_aluno);
    this.alunos_amostra.push(student);


  }

  carregar_alunos_matriculados(){
    this.ProfCursosService.getAlunosByDisciplinaId(this.id_disciplina).subscribe(
      response => {
        this.matriculadosStudents = response;
      },
      error => {
        console.error('Erro ao carregar alunos:', error);
      }
    );
  }

  removematriculadosStudents(student:Aluno){
    // confirmar com usuario se desejam remover o aluno
      this.ProfCursosService.remover_aluno_curso(this.id_disciplina,student.id_aluno).subscribe(
        (response) => {
          if(response == true){
            this.snackbar.open('Aluno desmatriculado com sucesso!', 'Fechar', { duration: 3000 });
            this.matriculadosStudents = this.matriculadosStudents.filter(aluno => aluno.id_aluno != student.id_aluno);
            this.alunos_amostra.push(student);
          }
        },
        (error) => {
          console.log(error)
        }
      );
      
  }

  cancelar(){
    this.selectedStudents = [];
    this.dialogRef.close();

  }

  adicionar_alunos(lista_alunos : Aluno[]){
    this.ProfCursosService.vincular_alunos_curso(this.id_disciplina,lista_alunos).subscribe(
      (response) => {
        //Mensagem de sucesso usando snackbar
        this.snackbar.open('Alunos matriculados com sucesso!', 'Fechar', { duration: 3000 });
        this.carregar_alunos_matriculados();
        this.selectedStudents = [];
      },
      (error) => {
        if(error.status == 500){
          this.snackbar.open('Aluno já existente!', 'Fechar', { duration: 3000 });
        }
      }
    );
  }
  

}
