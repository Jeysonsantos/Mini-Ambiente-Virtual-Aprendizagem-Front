import { SafeUrl } from '@angular/platform-browser';
export interface Anexo {
    id_anexo: number;
    nome : string;
    url: SafeUrl;
    dados: Blob;
    tipo: string;
    id_postagem: number;
    id_atividade: number;
  }
  