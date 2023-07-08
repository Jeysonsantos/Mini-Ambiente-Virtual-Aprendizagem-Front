import { Component, Inject,ViewEncapsulation  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminAlunosComponent } from '../admin-alunos.component';
import { AlunoService } from 'src/app/services/alunoService/aluno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Aluno {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  matricula: string;
  telefone: string;
  email: string;
}
@Component({
  selector: 'app-admin-aluno-dialog',
  templateUrl: './admin-aluno-dialog.component.html',
  styleUrls: ['./admin-aluno-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
  export class AdminAlunoDialogComponent {
    form: FormGroup;
    aluno: Aluno = {
      id: 0,
      nome: '',
      cpf: '',
      rg: '',
      matricula: '',
      telefone: '',
      email: ''
    };
    constructor(
      private dialogRef: MatDialogRef<AdminAlunosComponent>,
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private alunoService: AlunoService,
      private formBuilder: FormBuilder
    ) {
      this.form = this.formBuilder.group({
        nome: ['', Validators.required],
        matricula: ['', [Validators.required, Validators.maxLength(8)]],
        cpf: [''],
        rg: ['', [Validators.required, Validators.maxLength(8)]],
        telefone: ['', [Validators.required, Validators.maxLength(11)]],
      });
    }
  
    submitForm(): void 
    {
      if (this.form.invalid){
        return;
      }
      this.alunoService.salvarAluno(this.aluno).subscribe(
        response => {
          this.dialogRef.close();
  
          this.alunoService.obterAlunos().subscribe(
            alunos => {
              this.dialogData.atualizarLista(alunos);
            },
            error => {}
          );
        },
        error => {}
      );
    }
  }


