export interface Disciplina {
    id_disciplina: number;
    id_professor: number;
    nome: string;
    codigo: string;
    carga_horaria: number;
    ementa_pdf: Blob;
}
