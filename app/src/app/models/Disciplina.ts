import { Professor } from "./Professor";

export interface Disciplina {
    id_disciplina: number;
    id_professor: Professor;
    nome: string;
    codigo: string;
    periodo: string;
    carga_horaria: number;
    ementa_pdf: Blob;
}
