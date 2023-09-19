import { FormatoPipe } from './componentes_admin/admin-alunos/admin-aluno-dialog/formatos-entrada/formatoPipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component';
import { CursosComponent } from './componentes_aluno/cursos/cursos.component';
import { CursoDetalhesComponent } from './componentes_aluno/curso-detalhes/curso-detalhes.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './componentes_admin/admin/admin.component';
import { AlunoComponent } from './componentes_aluno/aluno/aluno.component';
import { ProfessorComponent } from './componentes_professor/professor/professor.component';
import { AdminAlunosComponent } from './componentes_admin/admin-alunos/admin-alunos.component';
import { AdminProfessoresComponent } from './componentes_admin/admin-professores/admin-professores.component';
import { AdminCursosComponent } from './componentes_admin/admin-cursos/admin-cursos.component'; 
import { MatCardModule } from '@angular/material/card';
import { AdminMenuComponent } from './componentes_admin/admin-menu/admin-menu.component';
import { AdminAlunoDialogComponent } from './componentes_admin/admin-alunos/admin-aluno-dialog/admin-aluno-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { AdminAlunoExcluirDialogComponent } from './componentes_admin/admin-alunos/admin-aluno-excluir-dialog/admin-aluno-excluir-dialog/admin-aluno-excluir-dialog.component';
import { AdminProfessorDialogComponent } from './componentes_admin/admin-professores/admin-professor-dialog/admin-professor-dialog/admin-professor-dialog.component';
import { AdminProfessorExcluirDialogComponent } from './componentes_admin/admin-professores/admin-professor-excluir-dialog/admin-professor-excluir-dialog/admin-professor-excluir-dialog.component';
import { AdminCursosDialogComponent } from './componentes_admin/admin-cursos/admin-cursos-dialog/admin-cursos-dialog/admin-cursos-dialog.component';
import { AdminCursosExcluirDialogComponent } from './componentes_admin/admin-cursos/admin-cursos-excluir-dialog/admin-cursos-excluir-dialog/admin-cursos-excluir-dialog.component';
import { ProfessorMenuComponent } from './componentes_professor/professor_menu/professor-menu/professor-menu.component';
import { ProfessorCursosComponent } from './componentes_professor/professor_cursos/professor-cursos/professor-cursos.component';
import { ProfessorCursoDetalhesComponent } from './componentes_professor/professor_curso_detalhes/professor-curso-detalhes/professor-curso-detalhes.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ProfessorAtividadeDetalhesComponent } from './componentes_professor/professor_atividade_detalhes/professor-atividade-detalhes/professor-atividade-detalhes.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CursosComponent,
    CursoDetalhesComponent,
    LoginComponent,
    AdminComponent,
    AlunoComponent,
    ProfessorComponent,
    AdminAlunosComponent,
    AdminProfessoresComponent,
    AdminCursosComponent,
    AdminMenuComponent,
    AdminAlunoDialogComponent,
    FormatoPipe,
    HeaderComponent,
    AdminAlunoExcluirDialogComponent,
    AdminProfessorDialogComponent,
    AdminProfessorExcluirDialogComponent,
    AdminCursosDialogComponent,
    AdminCursosExcluirDialogComponent,
    ProfessorMenuComponent,
    ProfessorCursosComponent,
    ProfessorCursoDetalhesComponent,
    ProfessorAtividadeDetalhesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatRippleModule,
    MatRadioModule,
    NgxFileDropModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
