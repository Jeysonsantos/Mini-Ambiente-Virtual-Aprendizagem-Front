import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Aluno } from 'src/app/models/Aluno';

@Component({
  selector: 'app-admin-aluno-excluir-dialog',
  templateUrl: './admin-aluno-excluir-dialog.component.html',
  styleUrls: ['./admin-aluno-excluir-dialog.component.scss']
})
export class AdminAlunoExcluirDialogComponent {
  aluno : Aluno;

  constructor(
    public dialogRef: MatDialogRef<AdminAlunoExcluirDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {aluno: Aluno}
  ) { 
    this.aluno = data.aluno;
  }

  confirmarExclusao(): void {
    this.dialogRef.close(true);
  }

  cancelarExclusao(): void {
    this.dialogRef.close(false);
  }

}
