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

  constructor(private profCursosService:ProfCursosService,private userDataService: UserDataServiceService) {}

  ngOnInit(): void {
    this.profCursosService.getCursos().subscribe((cursos: any) => {
      this.cursos = cursos;
    });
  }
}
