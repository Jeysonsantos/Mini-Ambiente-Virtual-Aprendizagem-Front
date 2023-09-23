import { ProfCursosService } from './../../../services/professorService/profCursosService/prof-cursos.service';
import { Disciplina } from './../../../models/Disciplina';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/models/Atividade';

@Component({
  selector: 'app-professor-atividade-detalhes',
  templateUrl: './professor-atividade-detalhes.component.html',
  styleUrls: ['./professor-atividade-detalhes.component.scss']
})
export class ProfessorAtividadeDetalhesComponent {
  disciplina: Disciplina | undefined;
  atividade : Atividade | undefined;
  id_disciplina : number | undefined;
  id_atividade : number | undefined;
  constructor(private Router:Router,private ProfCursosService:ProfCursosService,private route: ActivatedRoute) { 
  }

  
  ngOnInit(){
    this.route.params.subscribe(params => {
      const id_atividade = params['id_atividade'];
      const id_disciplina = params['id_disciplina'];
      this.ProfCursosService.getDisciplinaById(id_disciplina).subscribe((disciplina:Disciplina)=>{
        this.disciplina = disciplina;
        console.log(disciplina)
      });
      this.ProfCursosService.getAtividadeById(id_atividade).subscribe((atividade:Atividade)=>{
        console.log(this.atividade)
        this.atividade = atividade;
      });
    
    }); 
  }
  redirecionarDisciplina(id_disciplina:number){
    this.Router.navigate(['/professor/curso',id_disciplina]);
  }

  abrir_editar_atividade_aluno(){

  }

  home() {
    this.Router.navigate(['/professor']);
  }
}
