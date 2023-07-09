import { Component, Inject,ViewEncapsulation  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminAlunosComponent } from '../admin-alunos.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAlunoService } from 'src/app/services/adminService/adminAlunoService/admin-aluno.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    cpfFormatado: string;
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
      private AdminalunoService: AdminAlunoService,
      private formBuilder: FormBuilder,
      private snackBar: MatSnackBar,
    ) {
      this.cpfFormatado = ''
      this.form = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(3), Validators.pattern("^[a-zA-Z ]*$")]],
        matricula: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
        cpf: ['' , [Validators.required, Validators.maxLength(11), Validators.minLength(11),Validators.pattern("^[0-9]*$")]],
        rg: ['', [Validators.required, Validators.maxLength(8),Validators.pattern("^[0-9]*$"), Validators.minLength(4)]],
        telefone: ['', [Validators.required, Validators.maxLength(11),Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50), Validators.minLength(5), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
      });
    }
  
    submitForm(): void {
      if (this.form.invalid) {
        return;
      }
      const matricula = this.form.get('matricula')?.value;
      const cpf = this.form.get('cpf')?.value;
      const rg = this.form.get('rg')?.value;
      const telefone = this.form.get('telefone')?.value;
    
      this.AdminalunoService.verificarMatriculaExistente(matricula).subscribe(matriculaExistente => {
        if (matriculaExistente) {
          this.snackBar.open('A matrícula já existe.', 'Fechar', { duration: 3000 });
          return;
        }

        this.AdminalunoService.verificarCpfExistente(cpf).subscribe(cpfExistente => {
          if (cpfExistente) {
            this.snackBar.open('O CPF já existe.', 'Fechar', { duration: 3000 });
            return;
          }
          this.AdminalunoService.verificarRgExistente(rg).subscribe(rgExistente => {
            if (rgExistente) {
              this.snackBar.open('O RG já existe.', 'Fechar', { duration: 3000 });
              return;
            }
            this.AdminalunoService.verificarTelefoneExistente(telefone).subscribe(telefoneExistente => {
              if (telefoneExistente) {
                this.snackBar.open('O telefone já existe.', 'Fechar', { duration: 3000 });
                return;
              }
              this.aluno = this.form.value;
              this.AdminalunoService.salvarAluno(this.aluno).subscribe(
                response => {
                  this.dialogRef.close('success');
                },
                error => {}
              );
            });
          });
        });
      });
    }
  }