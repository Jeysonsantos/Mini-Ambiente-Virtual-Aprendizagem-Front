import { Component } from '@angular/core';

interface Curso {
  id: number;
  id_professor: number;
  nome: string;
  codigo: string;
  cargaHoraria: number;
  ementa: string;
}

interface nomeProfessor {
  id: number;
  nome: string;
}
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {
  cursos: Curso[] = [
    {
      id: 1,
      id_professor: 1,
      nome: 'Curso 1',
      codigo: 'ABC123',
      cargaHoraria: 40,
      ementa: 'Ementa do Curso 1'
    },
    {
      id: 2,
      id_professor: 2,
      nome: 'Curso 2',
      codigo: 'DEF456',
      cargaHoraria: 30,
      ementa: 'Ementa do Curso 2'
    },
  ];
  nomeProfessores: nomeProfessor[] = [
    {
      id: 1,
      nome: 'Professor 1'
    },
    {
      id: 2,
      nome: 'Professor 2'
    },

  ];

  obterNomeProfessor(idProfessor: number): string {
    const professor = this.nomeProfessores.find((prof) => prof.id === idProfessor);
    return professor ? professor.nome : 'Professor não encontrado';
  }
}
