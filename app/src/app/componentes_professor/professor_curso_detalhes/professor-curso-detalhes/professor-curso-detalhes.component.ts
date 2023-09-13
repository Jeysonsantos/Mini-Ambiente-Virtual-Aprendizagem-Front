import { Anexo } from './../../../models/Anexo';
import { ProfCursosService } from 'src/app/services/professorService/profCursosService/prof-cursos.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disciplina } from 'src/app/models/Disciplina';
import { Postagem } from 'src/app/models/Postagem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Atividade } from 'src/app/models/Atividade';

@Component({
  selector: 'app-professor-curso-detalhes',
  templateUrl: './professor-curso-detalhes.component.html',
  styleUrls: ['./professor-curso-detalhes.component.scss']
})
export class ProfessorCursoDetalhesComponent {
  disciplina: Disciplina = {} as Disciplina;
  expandInput: boolean = false;
  campoTextoVazio: boolean = true;

  postagens: Postagem[] = [];
  novaPostagem: string = '';
  arquivosSelecionados: FileList | null = null;
  selectedFileNames: string[] = [];
  anexos: Anexo[] = [];
  id_atividade = 0;

  @Output() arquivoExcluido = new EventEmitter<string>();


  form: FormGroup;

  constructor(private route: ActivatedRoute, private ProfCursosService: ProfCursosService, private Router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id_postagem: new FormControl(''),
      autor: new FormControl(''),
      conteudo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5000),]),
      tipo: new FormControl('informativo', Validators.required),
      data: new Date(),
      disciplina: this.disciplina,
      data_entrega: new FormControl(''),
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id_disciplina = params['id_disciplina'];

      this.ProfCursosService.getDisciplinaById(id_disciplina).subscribe(disciplina => {
        this.disciplina = disciplina;
      }
      );
    });
    //if (this.disciplina) {this.carregarPostagens(this.disciplina.id_disciplina);}
  }

  carregarPostagens(id_disciplina: number) {
    this.ProfCursosService.getPostagens(id_disciplina).subscribe(postagens => {
      this.postagens = postagens;
      console.log('Postagens:', postagens);
    }
    );
  }

  criarPostagem() {

    this.form.value.id_postagem = 0;
    this.form.value.autor = this.disciplina.id_professor.nome;
    this.form.value.disciplina = this.disciplina;
  
    console.log(this.arquivosSelecionados);
    if (this.form.valid) {
      this.ProfCursosService.criarPostagem(this.disciplina!.id_disciplina, this.form.value).subscribe(
        response => {

          const id_postagem = response.id_postagem;
          console.log('Resposta do servidor:', id_postagem);

          if (this.form.value.tipo == 'atividade') {
            const atividade:Atividade = {
              id_atividade: 0,
              descricao_atividade: this.form.value.conteudo,
              data_postagem: new Date(),
              data_entrega: this.form.value.data_entrega,
              id_disciplina: this.disciplina.id_disciplina,
              id_postagem: id_postagem,
            }
            this.ProfCursosService.criarAtividade(atividade).subscribe(
              response => {
                console.log('Resposta do servidor:', response);
                this.id_atividade = response.id_atividade;
              },
              error => {
                console.error('Erro ao criar atividade:', error);
                // Lidar com erros aqui
              }
            );
          }

          if (this.arquivosSelecionados) {
            this.uploadFile(id_postagem,this.id_atividade);
          }else
        },
        error => {
          console.error('Erro ao criar postagem:', error);
          // Lidar com erros aqui
        }

      );
    }
    if (this.arquivosSelecionados) {
      //this.uploadFile();
    }

    // Limpar o formulário
    this.novaPostagem = '';
    this.arquivosSelecionados = null;
    //this.carregarPostagens(this.disciplina!.id_disciplina);
  }

  uploadFile(id_postagem: number, id_atividade: number) {
    if (this.arquivosSelecionados) {
      this.ProfCursosService.uploadFile(this.arquivosSelecionados, id_atividade, id_postagem).subscribe(
        response => {
          console.log('Resposta do servidor:', response);
          // Lidar com a resposta do servidor aqui
        },
        error => {
          console.error('Erro ao enviar arquivo:', error);
          // Lidar com erros aqui
        }
      );
    }
  }

  anexarArquivo() {
    const inputFile = document.querySelector('input[type="file"]') as HTMLInputElement;
    inputFile?.click(); // Clique no input de arquivo oculto
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

  abrir_atividade(id_atividade: number) {
    this.Router.navigate(['/professor/atividade/' + id_atividade]); // Ainda nao existe a rota nem o componente
  }
}


