import { Anexo } from "./Anexo";
import { Disciplina } from "./Disciplina";

export interface Atividade {
    id_atividade: number;
    descricao_atividade : string;
    data_postagem: Date;
    data_entrega: Date;
    disciplina: Disciplina
    anexos_atividade : Anexo[];
}
