import { MatSnackBar } from '@angular/material/snack-bar';
import { DisciplinaAluno } from './../../models/DisciplinaAluno';
import { Component } from '@angular/core';
import { Disciplina } from 'src/app/models/Disciplina';
import { Professor } from 'src/app/models/Professor';
import { UserDataServiceService } from 'src/app/services/adminService/userDataService/user-data-service.service';
import { ProfCursosService } from 'src/app/services/professorService/profCursosService/prof-cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {
  AllDisciplinaAluno: DisciplinaAluno[] = [];
  cursos: Disciplina[] = [];
  professor: Professor | undefined;
  id_usuario: number = 0;


  constructor(private profCursosService:ProfCursosService,private userDataService: UserDataServiceService,private snackbar:MatSnackBar) {
    this.id_usuario = this.userDataService.idUsuario;
  }

  ngOnInit(): void {
    this.profCursosService.getAllDisciplinaAlunoByAluno_Id(this.id_usuario).subscribe((disciplinaAluno: any) => {
      this.AllDisciplinaAluno = disciplinaAluno;
      for (let i = 0; i < this.AllDisciplinaAluno.length; i++) { 
        this.cursos.push(this.AllDisciplinaAluno[i].disciplina);
      }
      this.cursos = this.deixar_maiusculo(this.cursos);
      this.cursos = this.ordenar_cursos(this.cursos);
      
    });
  }

  deixar_maiusculo(cursos: Disciplina[]){
    cursos.forEach((curso: any) => {
      curso.nome = curso.nome.toUpperCase();
      curso.id_professor.nome = curso.id_professor.nome.toUpperCase();
      curso.codigo = curso.codigo.toUpperCase();
    });
    return cursos;
  }

  ordenar_cursos(cursos: Disciplina[]){
    cursos.sort((a: any, b: any) => {
      if (a.periodo > b.periodo) {
        return -1;
      }
      if (a.periodo < b.periodo) {
        return 1;
      }
      return 0;
    });
    return cursos;
  }
  
}
