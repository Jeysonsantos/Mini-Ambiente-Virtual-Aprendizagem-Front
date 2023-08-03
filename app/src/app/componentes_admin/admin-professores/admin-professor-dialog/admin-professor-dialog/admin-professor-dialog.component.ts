import { Component,Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminProfessoresComponent } from '../../admin-professores.component';
import { Professor } from 'src/app/models/Professor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminProfessorService } from 'src/app/services/adminService/adminProfService/admin-professor.service';

@Component({
  selector: 'app-admin-professor-dialog',
  templateUrl: './admin-professor-dialog.component.html',
  styleUrls: ['./admin-professor-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProfessorDialogComponent {

    form: FormGroup;
    cpfFormatado: string;
    title: string;

    constructor(
      private dialogRef: MatDialogRef<AdminProfessoresComponent>,
      @Inject(MAT_DIALOG_DATA) public dialogData: { mode: string; professor: Professor; title: string; },
      private AdminprofessorService: AdminProfessorService,
      private formBuilder: FormBuilder,
      private snackBar: MatSnackBar,
    ) {
      this.title = dialogData.title;
      this.cpfFormatado = ''
      this.form = this.formBuilder.group({
        id_professor : [this.dialogData.professor.id_professor],
        nome: [this.dialogData.professor.nome, [Validators.required, Validators.maxLength(255), Validators.minLength(3)]],
        codigo: [this.dialogData.professor.codigo, [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
        cpf: [this.dialogData.professor.cpf , [Validators.required, Validators.maxLength(11), Validators.minLength(11),Validators.pattern("^[0-9]*$")]],
        rg: [this.dialogData.professor.rg, [Validators.required, Validators.maxLength(12),Validators.pattern("^[0-9]*$"), Validators.minLength(4)]],
        telefone: [this.dialogData.professor.telefone, [Validators.required, Validators.maxLength(15),Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
        email: [this.dialogData.professor.email, [Validators.required, Validators.email, Validators.maxLength(50), Validators.minLength(5), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
      });
    }
  
    submitForm(): void {
      if (this.form.invalid) {
        return;
      }
      const codigo = this.form.get('codigo')?.value;
      const cpf = this.form.get('cpf')?.value;
      const rg = this.form.get('rg')?.value;
      const telefone = this.form.get('telefone')?.value;
    
      this.AdminprofessorService.verificarCodigoExistente(codigo).subscribe(codigoExistente => {
        if (codigoExistente && this.dialogData.professor.codigo != codigo) {
          this.snackBar.open('O codigo já existe.', 'Fechar', { duration: 3000 });
          return;
        }

        this.AdminprofessorService.verificarCpfExistente(cpf).subscribe(cpfExistente => {
          if (cpfExistente && this.dialogData.professor.cpf != cpf) {
            this.snackBar.open('O CPF já existe.', 'Fechar', { duration: 3000 });
            return;
          }
          this.AdminprofessorService.verificarRgExistente(rg).subscribe(rgExistente => {
            if (rgExistente && this.dialogData.professor.rg != rg) {
              this.snackBar.open('O RG já existe.', 'Fechar', { duration: 3000 });
              return;
            }
            this.AdminprofessorService.verificarTelefoneExistente(telefone).subscribe(telefoneExistente => {
              if (telefoneExistente && this.dialogData.professor.telefone != telefone) {
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
