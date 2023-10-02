import { Anexo } from './../../../models/Anexo';
import { ProfCursosService } from 'src/app/services/professorService/profCursosService/prof-cursos.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disciplina } from 'src/app/models/Disciplina';
import { Postagem } from 'src/app/models/Postagem';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Atividade } from 'src/app/models/Atividade';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ProfessorCursoAddAlunosDialogComponent } from '../professor_curso_add_alunos_dialog/professor-curso-add-alunos-dialog/professor-curso-add-alunos-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private dialog:MatDialog,private route: ActivatedRoute, private ProfCursosService: ProfCursosService, private Router: Router, private formBuilder: FormBuilder,private sanitizer: DomSanitizer,private snackbar:MatSnackBar) {
    this.form = this.formBuilder.group({
      id_postagem: new FormControl(''),
      autor: new FormControl(''),
      titulo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100),]),
      conteudo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5000),]),
      tipo: new FormControl('informativo', Validators.required),
      postar: new FormControl('agora',Validators.required),
      data: new Date(),
      data_agendamento: [''],
      disciplina: this.disciplina,
      data_entrega: new FormControl('')
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
    if (this.form.valid) {
      this.ProfCursosService.criarPostagem(this.disciplina!.id_disciplina, this.form.value).subscribe(
        response => {
          this.id_postagem = response.id_postagem;
          if (response.tipo == 'atividade') {
            const atividade:Atividade = {
              id_atividade: 0,
              descricao_atividade: response.conteudo,
              titulo_atividade: response.titulo,
              data_postagem: response.data,
              data_entrega: response.data_entrega,
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
                this.snackbar.open('Erro ao criar atividade.', 'Fechar', { duration: 3000 });
              }
            );
          }else{
            if (this.arquivosSelecionados) {
              this.uploadFile(this.id_postagem, this.id_atividade, this.disciplina.id_disciplina);
            }
          }
          
        },
        error => {
          this.snackbar.open('Erro ao criar postagem.', 'Fechar', { duration: 3000 });
          
        }

      );
    }
    this.form = this.formBuilder.group({
      id_postagem: new FormControl(''),
      autor: new FormControl(''),
      titulo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100),]),
      conteudo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5000),]),
      tipo: new FormControl('informativo', Validators.required),
      postar: new FormControl('agora',Validators.required),
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
    inputFile?.click();
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
  tem_anexo(id_postagem: number): boolean{
    let tem_anexo = false;
    this.anexos.forEach(anexo => {
      if(anexo.id_postagem == id_postagem){
        tem_anexo = true;
      }
    });
    return tem_anexo;
  }
    
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFileNames.push(files[i].name);

    }
    this.arquivosSelecionados = files;
  }

  excluirArquivo(fileName: string) {
    this.selectedFileNames = this.selectedFileNames.filter((name) => name !== fileName);

    this.arquivoExcluido.emit(fileName);
  }

  home() {
    this.Router.navigate(['/professor']);
  }

  abrir_atividade(id_postagem: number,id_disciplina: number) {
    this.ProfCursosService.getAtividadeByPostagemId(id_postagem).subscribe(
      
      response => {
        console.log(response)
        this.Router.navigate(['/professor/curso/'+ id_disciplina + '/atividade/' + response.id_atividade]);
      },
      error => {
        this.snackbar.open('Erro ao abrir atividade.', 'Fechar', { duration: 3000 });
      }
    );
  }

  getDataEntregaAtividade(){
    this.ProfCursosService.getAtividadeByPostagemId(this.id_postagem).subscribe(
      response => {
        return response.data_entrega;
      },
      error => {
        this.snackbar.open('Erro ao abrir atividade.', 'Fechar', { duration: 3000 });
      }
    );

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

  abrir_add_alunos(id_disciplina:number){
    const dialogRef = this.dialog.open(ProfessorCursoAddAlunosDialogComponent, {
      width: '1200px',
      data: { mode: 'adicionar', id_disciplina: id_disciplina, title: 'Adicionar Alunos' }
    });

  }
  abrir_list_alunos(id_disciplina:number){
    this.snackbar.open('Funcionalidade em desenvolvimento, contate o desenvolvedor.', 'Fechar', { duration: 3000 });
  }

  set_data_entrega_agora(){
    console.log("setou data entrega agora")
    this.form.value.data_entrega = new Date();
  }

}


