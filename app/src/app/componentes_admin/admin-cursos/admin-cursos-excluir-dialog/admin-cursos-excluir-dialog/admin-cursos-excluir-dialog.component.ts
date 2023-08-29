import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Disciplina } from 'src/app/models/Disciplina';

@Component({
  selector: 'app-admin-cursos-excluir-dialog',
  templateUrl: './admin-cursos-excluir-dialog.component.html',
  styleUrls: ['./admin-cursos-excluir-dialog.component.scss']
})
export class AdminCursosExcluirDialogComponent {
  disciplina : Disciplina;

  constructor(
    public dialogRef: MatDialogRef<AdminCursosExcluirDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {disciplina: Disciplina}
  ) { 
    this.disciplina = data.disciplina;
  }

  confirmarExclusao(): void {
    this.dialogRef.close(true);
  }

  cancelarExclusao(): void {
    this.dialogRef.close(false);
  }
}
