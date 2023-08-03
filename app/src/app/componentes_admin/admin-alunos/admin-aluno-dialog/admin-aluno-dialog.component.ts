import { Component, Inject,ViewEncapsulation  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminAlunosComponent } from '../admin-alunos.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAlunoService } from 'src/app/services/adminService/adminAlunoService/admin-aluno.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Aluno } from 'src/app/models/Aluno';

@Component({
  selector: 'app-admin-aluno-dialog',
  templateUrl: './admin-aluno-dialog.component.html',
  styleUrls: ['./admin-aluno-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
  export class AdminAlunoDialogComponent{
    form: FormGroup;
    cpfFormatado: string;
    title: string;
    constructor(
      private dialogRef: MatDialogRef<AdminAlunosComponent>,
      @Inject(MAT_DIALOG_DATA) public dialogData: { mode: string; aluno: Aluno; title: string; },
      private AdminalunoService: AdminAlunoService,
      private formBuilder: FormBuilder,
      private snackBar: MatSnackBar,
    ) {
      this.title = dialogData.title;
      this.cpfFormatado = ''
      this.form = this.formBuilder.group({
        id_aluno : [this.dialogData.aluno.id_aluno],
        nome: [this.dialogData.aluno.nome, [Validators.required, Validators.maxLength(255), Validators.minLength(3)]],
        matricula: [this.dialogData.aluno.matricula, [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
        cpf: [this.dialogData.aluno.cpf , [Validators.required, Validators.maxLength(11), Validators.minLength(11),Validators.pattern("^[0-9]*$")]],
        rg: [this.dialogData.aluno.rg, [Validators.required, Validators.maxLength(12),Validators.pattern("^[0-9]*$"), Validators.minLength(4)]],
        telefone: [this.dialogData.aluno.telefone, [Validators.required, Validators.maxLength(15),Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
        email: [this.dialogData.aluno.email, [Validators.required, Validators.email, Validators.maxLength(50), Validators.minLength(5), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
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
        if (matriculaExistente && this.dialogData.aluno.matricula != matricula) {
          this.snackBar.open('A matrícula já existe.', 'Fechar', { duration: 3000 });
          return;
        }

        this.AdminalunoService.verificarCpfExistente(cpf).subscribe(cpfExistente => {
          if (cpfExistente && this.dialogData.aluno.cpf != cpf) {
            this.snackBar.open('O CPF já existe.', 'Fechar', { duration: 3000 });
            return;
          }
          this.AdminalunoService.verificarRgExistente(rg).subscribe(rgExistente => {
            if (rgExistente && this.dialogData.aluno.rg != rg) {
              this.snackBar.open('O RG já existe.', 'Fechar', { duration: 3000 });
              return;
            }
            this.AdminalunoService.verificarTelefoneExistente(telefone).subscribe(telefoneExistente => {
              if (telefoneExistente && this.dialogData.aluno.telefone != telefone) {
                this.snackBar.open('O telefone já existe.', 'Fechar', { duration: 3000 });
                return;
              }
              this.dialogRef.close(this.form.value);
            });
          });
        });
      });
    }
  }