import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Professor } from 'src/app/models/Professor';

@Component({
  selector: 'app-admin-professor-excluir-dialog',
  templateUrl: './admin-professor-excluir-dialog.component.html',
  styleUrls: ['./admin-professor-excluir-dialog.component.scss']
})
export class AdminProfessorExcluirDialogComponent {
  professor : Professor;

  constructor(
    public dialogRef: MatDialogRef<AdminProfessorExcluirDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {professor: Professor}
  ) { 
    this.professor = data.professor;
  }

  confirmarExclusao(): void {
    this.dialogRef.close(true);
  }

  cancelarExclusao(): void {
    // Caso a exclusão seja cancelada, você pode simplesmente fechar o dialog e retornar false no método afterClosed()
    this.dialogRef.close(false);
  }

}
