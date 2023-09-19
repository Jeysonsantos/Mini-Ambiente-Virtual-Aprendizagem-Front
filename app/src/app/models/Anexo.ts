export interface Anexo {
    id_anexo: number;
    nome : string;
    url: string;
    dados: Blob;
    tipo: string;
    id_postagem: number;
    id_atividade: number;
  }
  