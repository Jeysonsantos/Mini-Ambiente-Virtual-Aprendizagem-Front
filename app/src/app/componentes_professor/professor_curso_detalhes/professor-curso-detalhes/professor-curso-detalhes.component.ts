import { Anexo } from './../../../models/Anexo';
import { ProfCursosService } from 'src/app/services/professorService/profCursosService/prof-cursos.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disciplina } from 'src/app/models/Disciplina';
import { Postagem } from 'src/app/models/Postagem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Atividade } from 'src/app/models/Atividade';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-professor-curso-detalhes',
  templateUrl: './professor-curso-detalhes.component.html',
  styleUrls: ['./professor-curso-detalhes.component.scss']
})
export class ProfessorCursoDetalhesComponent {
  disciplina: Disciplina = {} as Disciplina;
  expandInput: boolean = false;
  campoTextoVazio: boolean = true;

  anexos : Anexo[] = [];
  postagens: Postagem[] = [];
  novaPostagem: string = '';
  arquivosSelecionados: FileList | null = null;
  selectedFileNames: string[] = [];
  id_atividade = 0;
  exibirAgendamento: boolean = false;
  id_postagem = 0;

  @Output() arquivoExcluido = new EventEmitter<string>();


  form: FormGroup;

  constructor(private route: ActivatedRoute, private ProfCursosService: ProfCursosService, private Router: Router, private formBuilder: FormBuilder,private sanitizer: DomSanitizer) {
    this.form = this.formBuilder.group({
      id_postagem: new FormControl(''),
      autor: new FormControl(''),
      conteudo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5000),]),
      tipo: new FormControl('informativo', Validators.required),
      data: new Date(),
      data_agendamento: [''],
      disciplina: this.disciplina,
      data_entrega: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id_disciplina = params['id_disciplina'];

      this.ProfCursosService.getDisciplinaById(id_disciplina).subscribe(disciplina => {
        this.disciplina = disciplina;
        this.carregarPostagens(id_disciplina);
        this.carregarAnexos(id_disciplina);
        
      }
      );
    });
  }

  carregarPostagens(id_disciplina: number) {
    this.ProfCursosService.getPostagens(id_disciplina).subscribe(postagens => {
      this.postagens = postagens;
      // ordernar por data de postagem
      this.postagens.sort((a, b) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
      });
     
    });
  }
  

  criarPostagem() {
    
    this.form.value.id_postagem = 0;
    this.form.value.autor = this.disciplina.id_professor.nome;
    this.form.value.disciplina = this.disciplina;

    if(this.form.value.data_agendamento != ''){
      this.form.value.data = this.form.value.data_agendamento;
    }
    console.log(this.form.value)
  
    console.log(this.arquivosSelecionados);
    if (this.form.valid) {
      this.ProfCursosService.criarPostagem(this.disciplina!.id_disciplina, this.form.value).subscribe(
        response => {
          this.id_postagem = response.id_postagem;
          if (this.form.value.tipo == 'atividade') {
            const atividade:Atividade = {
              id_atividade: 0,
              descricao_atividade: this.form.value.conteudo,
              data_postagem: this.form.value.data,
              data_entrega: this.form.value.data_entrega,
              id_disciplina: this.disciplina.id_disciplina,
              id_postagem: this.id_postagem,
              
            }
            this.ProfCursosService.criarAtividade(atividade).subscribe(
              response => {
                this.id_atividade = response.id_atividade;
                console.log(response)
                if (this.arquivosSelecionados) {
                  this.uploadFile(this.id_postagem, this.id_atividade, this.disciplina.id_disciplina);
                  
                }
              },
              error => {
                console.error('Erro ao criar atividade:', error);
              }
            );
          }else{
            if (this.arquivosSelecionados) {
              this.uploadFile(this.id_postagem, this.id_atividade, this.disciplina.id_disciplina);
            }
          }
          
        },
        error => {
          console.error('Erro ao criar postagem:', error);
          // Lidar com erros aqui
        }

      );
    }
    this.form = this.formBuilder.group({
      id_postagem: new FormControl(''),
      autor: new FormControl(''),
      conteudo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5000),]),
      tipo: new FormControl('informativo', Validators.required),
      data: new Date(),
      data_agendamento: [''],
      disciplina: this.disciplina,
      data_entrega: new FormControl(''),
    });
    this.expandInput = false;
    this.selectedFileNames = [];

    setTimeout(() => {
      this.ngOnInit();
    }, 10000);
  }

  uploadFile(id_postagem: number, id_atividade: number,id_disciplina: number) {
    if (this.arquivosSelecionados) {
      for(let i = 0; i < this.arquivosSelecionados.length; i++){
        this.ProfCursosService.uploadFile(this.arquivosSelecionados[i], id_atividade, id_postagem,id_disciplina).subscribe();

      }

    }
    this.novaPostagem = '';
    this.arquivosSelecionados = null;
  }

  anexarArquivo() {
    const inputFile = document.querySelector('input[type="file"]') as HTMLInputElement;
    inputFile?.click(); // Clique no input de arquivo oculto
  }

  carregarAnexos(id_disciplina: number){
    this.ProfCursosService.getAnexosByDisciplinaId(id_disciplina).subscribe(
      response => {
        this.anexos = response;
      },
      error => {
        console.error('Erro ao carregar anexos:', error);
      }
    );

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
  

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFileNames.push(files[i].name);

    }
    this.arquivosSelecionados = files;
  }

  excluirArquivo(fileName: string) {
    // Remova o arquivo da lista de nomes de arquivos selecionados
    this.selectedFileNames = this.selectedFileNames.filter((name) => name !== fileName);

    // Emita um evento personalizado para notificar a exclusão
    this.arquivoExcluido.emit(fileName);
  }

  home() {
    this.Router.navigate(['/professor']);
  }

  abrir_atividade(id_atividade: number,id_disciplina: number) {
    console.log(id_atividade);
    console.log(id_disciplina)
    this.Router.navigate(['/professor/curso/'+ id_disciplina + '/atividade/' + id_atividade]); // Ainda nao existe a rota nem o componente
  }

  onSubmit() {
    const formData = this.form.value;

    if (formData.data_agendamento) {
      // Agendar a publicação usando formData.data_agendamento
      console.log('Publicação agendada para', formData.data_agendamento);
    } else {
      // Publicar imediatamente
      console.log('Publicação imediata');
    }

    // Enviar os outros dados do formulário para o servidor
    console.log('Conteúdo:', formData.conteudo);
    console.log('Tipo:', formData.tipo);
    console.log('Data de Entrega:', formData.data_entrega);
  }

  toggleAgendamento() {
    this.exibirAgendamento = !this.exibirAgendamento;
  }

}


