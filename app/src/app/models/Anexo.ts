export interface Anexo {
    id_anexo: number;
    descricao : string;
    url: string;
    arquivo: Promise<string | ArrayBuffer | null>;
    id_postagem: number;
    id_atividade: number;
  }
  