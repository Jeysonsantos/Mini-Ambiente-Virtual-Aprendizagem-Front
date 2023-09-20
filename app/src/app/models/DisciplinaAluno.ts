import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";

export interface DisciplinaAluno {
    id_disciplina_aluno: number;
    aluno : Aluno
    disciplina : Disciplina
    nota_ab1 : number;
    nota_ab2 : number;
}
