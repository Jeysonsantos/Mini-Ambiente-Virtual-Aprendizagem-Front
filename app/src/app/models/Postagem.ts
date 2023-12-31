import { Anexo } from "./Anexo";
import { Atividade } from "./Atividade";
import { Disciplina } from "./Disciplina";


export interface Postagem {
  id_postagem: number;
  titulo: string;
  autor: string;
  conteudo: string; // Conteúdo de texto
  data: Date;
  data_entrega: Date;
  tipo: 'informativo' | 'atividade';
  atividade : Atividade;
  disciplina: Disciplina
  anexos : Anexo[];

}

