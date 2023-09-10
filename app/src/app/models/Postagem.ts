import { Anexo } from "./Anexo";
import { Atividade } from "./Atividade";


export interface Postagem {
  id_postagem: number;
  autor: string;
  conteudo: string; // Conteúdo de texto
  anexos: Anexo[]; // Uma matriz de anexos (PDF, imagens, etc.)
  data: Date;
  tipo: 'informativo' | 'atividade';
  atividade : Atividade;
}

