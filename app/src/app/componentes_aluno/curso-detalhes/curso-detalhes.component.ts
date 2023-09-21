import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Anexo } from 'src/app/models/Anexo';
import { Atividade } from 'src/app/models/Atividade';
import { Disciplina } from 'src/app/models/Disciplina';
import { Postagem } from 'src/app/models/Postagem';
import { ProfCursosService } from 'src/app/services/professorService/profCursosService/prof-cursos.service';
import { Router } from '@angular/router';
import { UserDataServiceService } from 'src/app/services/adminService/userDataService/user-data-service.service';
import { Aluno } from 'src/app/models/Aluno';
import { AlunoService } from 'src/app/services/alunoService/aluno.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-curso-detalhes',
  templateUrl: './curso-detalhes.component.html',
  styleUrls: ['./curso-detalhes.component.scss']
})
export class CursoDetalhesComponent {
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
  aluno: Aluno | undefined;

  @Output() arquivoExcluido = new EventEmitter<string>();


  form: FormGroup;

  constructor(private route: ActivatedRoute, private ProfCursosService: ProfCursosService, private Router: Router, private formBuilder: FormBuilder,private sanitizer: DomSanitizer,private userDataServiceService: UserDataServiceService,private AlunoService:AlunoService,private snackbar:MatSnackBar) {
    this.form = this.formBuilder.group({
      id_postagem: new FormControl(''),
      autor: new FormControl(''),
      conteudo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5000),]),
      tipo: new FormControl('informativo', Validators.required),
      postar: new FormControl('agora',Validators.required),
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

    this.AlunoService.getAlunoById(this.userDataServiceService.idUsuario).subscribe((aluno: any) => {
      this.aluno = aluno;
    }
    );
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
    this.form.value.autor = this.aluno?.nome;
    this.form.value.disciplina = this.disciplina;

    if(this.form.value.data_agendamento != ''){
      this.form.value.data = this.form.value.data_agendamento;
    }
    if (this.form.valid) {
      this.ProfCursosService.criarPostagem(this.disciplina!.id_disciplina, this.form.value).subscribe(
        response => {
          this.id_postagem = response.id_postagem;
          if (this.arquivosSelecionados) {
            this.uploadFile(this.id_postagem, this.id_atividade, this.disciplina.id_disciplina);
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
    inputFile?.click(); // Clique no input de arquivo oculto
  }

  carregarAnexos(id_disciplina: number){
    this.ProfCursosService.getAnexosByDisciplinaId(id_disciplina).subscribe(
      response => {
        this.anexos = response;
        //gerar o link de download para cada anexo
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
    // Remova o arquivo da lista de nomes de arquivos selecionados
    this.selectedFileNames = this.selectedFileNames.filter((name) => name !== fileName);

    // Emita um evento personalizado para notificar a exclusão
    this.arquivoExcluido.emit(fileName);
  }

  home() {
    this.Router.navigate(['/aluno']);
  }

  abrir_atividade(id_atividade: number,id_disciplina: number) {
    console.log(id_atividade);
    console.log(id_disciplina)
    this.Router.navigate(['/aluno/curso/'+ id_disciplina + '/atividade/' + id_atividade]); // Ainda nao existe a rota nem o componente
  }

}
