import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Features } from '../models/features';


@Component({
  selector: 'app-feature-selector',
  templateUrl: './feature-selector.component.html',
  styleUrls: ['./feature-selector.component.scss']
})
export class FeatureSelectorComponent {
  agendamentoAtivo: boolean = false;
  postagemAnexosAtiva: boolean = false;
  criarSecretariaAtiva: boolean = false;
  criarMonitorAtiva: boolean = false;
  constructor(private dialogRef: MatDialogRef<LoginComponent>,private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public dialogData: { mode: boolean; features: Features; }) { 
    this.agendamentoAtivo = dialogData.features.agendamentoAtivo;
    this.postagemAnexosAtiva = dialogData.features.postagemAnexosAtiva;
    this.criarSecretariaAtiva = dialogData.features.criarSecretariaAtiva;
    this.criarMonitorAtiva = dialogData.features.criarMonitorAtiva;
  }
  
  confirmarRecursos() {
    this.dialogRef.close(
      {
        agendamentoAtivo: this.agendamentoAtivo,
        postagemAnexosAtiva: this.postagemAnexosAtiva,
        criarSecretariaAtiva: this.criarSecretariaAtiva,
        criarMonitorAtiva: this.criarMonitorAtiva,
      }
    );
    this.snackBar.open('Recursos selecionados  com sucesso!', 'Fechar', { duration: 3000 });
  
  }
}
