import { ProfCursosService } from './../../../services/professorService/profCursosService/prof-cursos.service';
import { Disciplina } from './../../../models/Disciplina';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/models/Atividade';
import { Anexo } from 'src/app/models/Anexo';
import { AtividadeAluno } from 'src/app/models/AtividadeAluno';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-professor-atividade-detalhes',
  templateUrl: './professor-atividade-detalhes.component.html',
  styleUrls: ['./professor-atividade-detalhes.component.scss']
})
export class ProfessorAtividadeDetalhesComponent {
  disciplina: Disciplina | undefined;
  atividade : Atividade | undefined;
  id_disciplina : number = 0;
  id_atividade : number = 0;
  anexos : Anexo[] = [];
  atividade_alunos : AtividadeAluno[] = [];
  arquivoSelecionado: File | undefined;
  constructor(private Router:Router,private ProfCursosService:ProfCursosService,private route: ActivatedRoute,private sanitizer: DomSanitizer,private snackbar:MatSnackBar) { 
  }

  
  ngOnInit(){
    this.route.params.subscribe(params => {
      const id_atividade = params['id_atividade'];
      const id_disciplina = params['id_disciplina'];
      this.ProfCursosService.getDisciplinaById(id_disciplina).subscribe((disciplina:Disciplina)=>{
        this.disciplina = disciplina;
        this.carregarAnexos(id_disciplina);
        console.log(disciplina)
      });
      this.ProfCursosService.getAtividadeById(id_atividade).subscribe((atividade:Atividade)=>{
        console.log(this.atividade)
        this.atividade = atividade;
      });
    
    });
  }
  tempo_restante(): string {
    const data_entrega = this.atividade?.data_entrega ? new Date(this.atividade.data_entrega) : undefined;
    const data_atual = new Date();
  
    if (data_entrega) {
      if (data_atual > data_entrega) {
        return 'Prazo de entrega expirado';
      }
  
      // Calcula a diferença em milissegundos
      const diff = data_entrega.getTime() - data_atual.getTime();
  
      // Calcula a diferença em dias e horas
      const diffDays = Math.floor(diff / (1000 * 3600 * 24));
      const diffHours = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
  
      // Constrói a string de resultado
      let resultado = '';
      if (diffDays > 0) {
        resultado += `${diffDays} dia${diffDays > 1 ? 's' : ''} `;
      }
      if (diffHours > 0) {
        resultado += `${diffHours} hora${diffHours > 1 ? 's' : ''}`;
      }
  
      return resultado;
    } else {
      // Trate o caso em que this.atividade?.data_entrega é undefined
      // Retorne um valor padrão ou trate de outra forma
      return 'Data de entrega não definida';
    }
  }
  num_enviados(){
    let num_enviados = 0;
    this.atividade_alunos.forEach(atividade_aluno => {
      if(atividade_aluno.atividade.id_atividade == this.atividade?.id_atividade){
        num_enviados++;
      }
    });
    return num_enviados;
  }

  carregarAnexos(id_disciplina: number){
    this.ProfCursosService.getAnexosByDisciplinaId(id_disciplina).subscribe(
      response => {
        this.anexos = response;
        
        this.anexos.forEach(anexo => {
          anexo.url = this.getDownloadLink(anexo);
          anexo.dados = Blob as any;
        });
      },
      error => {
        this.snackbar.open('Erro ao carregar anexos.', 'Fechar', { duration: 3000 });
        
      }
    );
  }

  getDownloadLink(anexo: any): SafeUrl {
    const dados = this.base64ToArrayBuffer(anexo.dados);

    if(anexo.tipo == 'application/pdf'){
      const blob = new Blob([dados], { type: 'application/pdf' });
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    }else if(anexo.tipo == 'image/png'){
      const blob = new Blob([dados], { type: 'image/png' });
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    }else if(anexo.tipo == 'image/jpeg'){
      const blob = new Blob([dados], { type: 'image/jpeg' });
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    }else if(anexo.tipo == 'image/jpg'){
      const blob = new Blob([dados], { type: 'image/jpg' });
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    }else{
      const blob = new Blob([dados], { type: 'application/octet-stream' });
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    }
  }

  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  }
  redirecionarDisciplina(id_disciplina:number){
    this.Router.navigate(['/professor/curso',id_disciplina]);
  }

  abrir_editar_atividade_aluno(){
    this.snackbar.open('Funcionalidade em desenvolvimento, contate o desenvolvedor.', 'Fechar', { duration: 3000 });

  }

  home() {
    this.Router.navigate(['/professor']);
  }

  selecionarArquivo(event: any) {
    // Capturar o arquivo selecionado pelo usuário
    this.arquivoSelecionado = event.target.files[0];
  }

  enviarArquivos(id_atividade: number) {
    if (this.arquivoSelecionado) {
      // Enviar o arquivo selecionado como resposta
      this.ProfCursosService.enviarResposta(id_atividade, this.arquivoSelecionado).subscribe(response => {
        // Lógica de tratamento após o envio da resposta

      });
    }
  }

  anexarArquivos(event: any): void {
    // Lógica para anexar arquivos
  }
  tem_anexo(id_postagem: number): boolean{
    let tem_anexo = false;
    this.anexos.forEach(anexo => {
      if(anexo.id_postagem == id_postagem){
        tem_anexo = true;
      }
    });
    return tem_anexo;
  }

}
