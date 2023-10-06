import { Features } from './../../../models/features';
import { Component } from '@angular/core';
import { Disciplina } from 'src/app/models/Disciplina';
import { Professor } from 'src/app/models/Professor';
import { UserDataServiceService } from 'src/app/services/adminService/userDataService/user-data-service.service';
import { ProfCursosService } from 'src/app/services/professorService/profCursosService/prof-cursos.service';

@Component({
  selector: 'app-professor-cursos',
  templateUrl: './professor-cursos.component.html',
  styleUrls: ['./professor-cursos.component.scss']
})
export class ProfessorCursosComponent {
  cursos: Disciplina[] = [];
  professor: Professor | undefined;
  id_usuario: number = 0;
  Features: Features = {} as Features;

  constructor(private profCursosService:ProfCursosService,private userDataService: UserDataServiceService) {
    this.id_usuario = this.userDataService.idUsuario;
    this.Features = this.userDataService.Features;
  }

  ngOnInit(): void {
    this.profCursosService.getCursosByProfessorId(this.id_usuario).subscribe((cursos: any) => {
      ///deixa tudo maiusculo
      cursos.forEach((curso: any) => {
        curso.nome = curso.nome.toUpperCase();
        curso.id_professor.nome = curso.id_professor.nome.toUpperCase();
        curso.codigo = curso.codigo.toUpperCase();
      });
      ///ordenar por periodo maior para o menor
      cursos.sort((a: any, b: any) => {
        if (a.periodo > b.periodo) {
          return -1;
        }
        if (a.periodo < b.periodo) {
          return 1;
        }
        return 0;
      });
      this.cursos = cursos;
    });
  }
}
