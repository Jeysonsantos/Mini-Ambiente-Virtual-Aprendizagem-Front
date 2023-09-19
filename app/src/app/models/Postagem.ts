import { Anexo } from "./Anexo";
import { Atividade } from "./Atividade";
import { Disciplina } from "./Disciplina";


export interface Postagem {
  id_postagem: number;
  autor: string;
  conteudo: string; // Conteúdo de texto
  data: Date;
  tipo: 'informativo' | 'atividade';
  atividade : Atividade;
  disciplina: Disciplina
  anexos : Anexo[];
}

