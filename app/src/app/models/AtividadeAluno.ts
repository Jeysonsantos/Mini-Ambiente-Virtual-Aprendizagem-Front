import { Aluno } from "./Aluno";
import { Atividade } from "./Atividade";

export interface AtividadeAluno {
    id_atividade_aluno: number;
    aluno: Aluno;
    atividade: Atividade;
    nota: number;
}
