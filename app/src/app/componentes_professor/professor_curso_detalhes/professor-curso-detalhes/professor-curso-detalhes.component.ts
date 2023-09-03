import { ProfCursosService } from 'src/app/services/professorService/profCursosService/prof-cursos.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Disciplina } from 'src/app/models/Disciplina';

@Component({
  selector: 'app-professor-curso-detalhes',
  templateUrl: './professor-curso-detalhes.component.html',
  styleUrls: ['./professor-curso-detalhes.component.scss']
})
export class ProfessorCursoDetalhesComponent {
  disciplina : Disciplina | undefined;

  constructor(private route: ActivatedRoute, private ProfCursosService: ProfCursosService ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id_disciplina = params['id_disciplina'];
      
      console.log('ID da disciplina:', id_disciplina);
      
      //buscar os dados da disciplina jaja
      this.ProfCursosService.getDisciplinaById(id_disciplina).subscribe(disciplina => {
        this.disciplina = disciplina;
        console.log('Disciplina:', disciplina);
      }
      );
    });
  }
}
