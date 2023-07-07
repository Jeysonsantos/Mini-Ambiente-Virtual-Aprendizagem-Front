import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './componentes_aluno/footer/footer.component';
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
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
