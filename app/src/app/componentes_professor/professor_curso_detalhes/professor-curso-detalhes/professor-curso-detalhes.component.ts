import { ProfCursosService } from 'src/app/services/professorService/profCursosService/prof-cursos.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disciplina } from 'src/app/models/Disciplina';
import { Postagem } from 'src/app/models/Postagem';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
  arquivoSelecionado: File | null = null;

  form: FormGroup;

  constructor(private route: ActivatedRoute, private ProfCursosService: ProfCursosService, private Router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      conteudo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5000),]),
      tipo: new FormControl('atividade',Validators.required),
    });
    
    // Postagem de teste
    this.postagens.push({
      id_postagem: 1,
      autor: 'Fulano',
      conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Sed vitae nisl vitae nisluctus blandit. Null,',
      tipo: 'informativo',
      atividade: {
        id_atividade: 1,
        descricao_atividade: 'Atividade de teste',
        data_postagem: new Date(),
        data_entrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias a partir de agora
        disciplina: {
          id_disciplina: 1,
          nome: 'Teste',
          codigo: 'TST001',
          periodo: '2021.1',
          carga_horaria: 60,
          ementa_pdf: new Blob(),
          id_professor: {
            id_professor: 1,
            nome: 'Fulano',
            cpf: '12345678910',
            rg: '123456789',
            codigo: 'TST001',
            email: 'qweqwe@gmail.com',
            telefone: '123456789'
          }
        },
        anexos_atividade: [
          {
            id_anexo: 1,
            descricao: 'Exemplo de PDF da atividadede teste',
            url: 'https://drive.google.com/file/d/1d4LIxXziXbCHDNrOH6KizHmiPx2n1HFB/view?usp=sharing'
          },
        ]
      },
      data: new Date(),
      anexos: [
        {
          id_anexo: 1,
          descricao: 'Exemplo de PDF de teste',
          url: 'https://drive.google.com/file/d/1d4LIxXziXbCHDNrOH6KizHmiPx2n1HFB/view?usp=sharing'
        },
      ]
    },
      {
        id_postagem: 2,
        autor: 'Professor',
        conteudo: 'Lorem asdasdasd ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Sed vitae nisl vitae nisluctus blandit. Null,',
        tipo: 'atividade',
        atividade: {
          id_atividade: 1,
          descricao_atividade: 'Atividade de testewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
          data_postagem: new Date(),
          data_entrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias a partir de agora
          disciplina: {
            id_disciplina: 1,
            nome: 'Teste',
            codigo: 'TST001',
            periodo: '2021.1',
            carga_horaria: 60,
            ementa_pdf: new Blob(),
            id_professor: {
              id_professor: 1,
              nome: 'Fulano',
              cpf: '12345678910',
              rg: '123456789',
              codigo: 'TST001',
              email: 'qweqwe@gmail.com',
              telefone: '123456789'
            }
          },
          anexos_atividade: [
            {
              id_anexo: 1,
              descricao: 'Exemplo de PDF da atividadede teste',
              url: 'https://drive.google.com/file/d/1d4LIxXziXbCHDNrOH6KizHmiPx2n1HFB/view?usp=sharing'
            },
          ]
        },
        data: new Date(),
        anexos: [
          {
            id_anexo: 1,
            descricao: 'Exemplo de PDF de teste',
            url: 'https://drive.google.com/file/d/1d4LIxXziXbCHDNrOH6KizHmiPx2n1HFB/view?usp=sharing'
          },
        ]
      }

    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id_disciplina = params['id_disciplina'];

      this.ProfCursosService.getDisciplinaById(id_disciplina).subscribe(disciplina => {
        this.disciplina = disciplina;
        console.log('Disciplina:', disciplina);
      }
      );
    });
    if (this.disciplina) {
      this.carregarPostagens(this.disciplina.id_disciplina);
    }
  }

  postar() {
    if (this.form.valid) {
      const conteudo = this.form.value.conteudo;
      const tipo = this.form.value.tipo;

      console.log(conteudo, tipo);
    }
    console.log("entrou no postar");
  }

  carregarPostagens(id_disciplina: number) {
    this.ProfCursosService.getPostagens(id_disciplina).subscribe(postagens => {
      this.postagens = postagens;
      console.log('Postagens:', postagens);
    }
    );
  }

  criarPostagem() {
    // Enviar a nova postagem para o servidor, incluindo o arquivo, se houver
    const formData = new FormData();
    formData.append('conteudo', this.novaPostagem);

    if (this.arquivoSelecionado) {
      formData.append('anexo', this.arquivoSelecionado, this.arquivoSelecionado.name);
    }

    this.ProfCursosService.criarPostagem(this.disciplina!.id_disciplina, formData).subscribe(() => {
      // Atualizar a lista de postagens
      this.carregarPostagens(this.disciplina!.id_disciplina);

      // Limpar o formulário
      this.novaPostagem = '';
      this.arquivoSelecionado = null;
    }
    );
  }

  onFileSelected(event: any) {
    // Captura o arquivo selecionado pelo usuário
    this.arquivoSelecionado = event.target.files[0];
  }

  home() {
    this.Router.navigate(['/professor']);
  }

  abrir_atividade(id_atividade: number) {
    this.Router.navigate(['/professor/atividade/' + id_atividade]); // Ainda nao existe a rota nem o componente
  }
}


