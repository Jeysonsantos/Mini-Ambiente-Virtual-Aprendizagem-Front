import { AdminProfessorService } from './../../../../services/adminService/adminProfService/admin-professor.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminCursosComponent } from '../../admin-cursos.component';
import { Disciplina } from 'src/app/models/Disciplina';
import { AdminDisciServiceService } from 'src/app/services/adminService/adminDisciService/admin-disci-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Professor } from 'src/app/models/Professor';

@Component({
  selector: 'app-admin-cursos-dialog',
  templateUrl: './admin-cursos-dialog.component.html',
  styleUrls: ['./admin-cursos-dialog.component.scss']
})
export class AdminCursosDialogComponent {
  professores: Professor[] = [];
  searchText: string = '';
  selectedProfessor: String | null = null;

  form: FormGroup;
  title: string;
  constructor(
    private dialogRef: MatDialogRef<AdminCursosComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { mode: string; disciplina: Disciplina; title: string; },
    private AdmindisciplinaService: AdminDisciServiceService,
    private AdminProfessorService: AdminProfessorService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.title = dialogData.title;
    console.log(this.dialogData.disciplina)
    if(this.dialogData.disciplina.id_professor){
      this.selectedProfessor = this.dialogData.disciplina.id_professor.nome;
    }
    this.form = this.formBuilder.group({
      id_disciplina : [this.dialogData.disciplina.id_disciplina],
      id_professor : [this.dialogData.disciplina.id_professor],
      nome: [this.dialogData.disciplina.nome, [Validators.required, Validators.maxLength(255), Validators.minLength(3)]],
      codigo: [this.dialogData.disciplina.codigo, [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      carga_horaria: [this.dialogData.disciplina.carga_horaria, [Validators.required, Validators.maxLength(3), Validators.minLength(2), Validators.pattern("^[0-9]*$")]],
      ementa_pdf: [null],
      periodo: [this.dialogData.disciplina.periodo, [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern("[0-9]{4}.[0-9]{1}")]],

    });
  }

  ngOnInit(): void {
    this.AdminProfessorService.getProfessores().subscribe(
      (professores:Professor[]) => {
        professores.sort((a, b) => (a.nome > b.nome) ? 1 : -1);
        this.professores = professores;
      },
      (error) => {
        this.snackBar.open('Erro ao carregar professores.', 'Fechar', { duration: 3000 });
      }
    );
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }
    const codigo = this.form.get('codigo')?.value;
  
    this.AdmindisciplinaService.verificarCodigoExistente(codigo).subscribe(codigoExistente => {
      if (codigoExistente && this.dialogData.disciplina.codigo != codigo) {
        this.snackBar.open('O codigo já existe.', 'Fechar', { duration: 3000 });
        return;
      }
      this.dialogRef.close(this.form.value);
    });
  }

  selectedFile: File | null = null;
  selectedFileName: string = '';
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      if (this.selectedFile.type === 'application/pdf') {
        // Você pode acessar informações sobre o arquivo, como nome, tamanho, tipo, etc.
        this.form.get('ementa_pdf')?.setValue(this.selectedFile);
        this.selectedFileName = this.selectedFile.name;
      }else{
        this.snackBar.open('O arquivo deve ser do tipo PDF.', 'Fechar', { duration: 3000 });
        return;
      }

      
    }else{
      this.selectedFileName = '';
    }

  }

}