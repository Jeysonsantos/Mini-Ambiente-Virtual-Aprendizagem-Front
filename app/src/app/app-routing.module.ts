import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/authguard';
import { AdminComponent } from './componentes_admin/admin/admin.component';
import { AlunoComponent } from './componentes_aluno/aluno/aluno.component';
import { UserRoleGuard } from './auth/UserRoleGuard';
import { AdminAlunosComponent } from './componentes_admin/admin-alunos/admin-alunos.component';
import { AdminGuard } from './auth/Adminguard';
import { AdminCursosComponent } from './componentes_admin/admin-cursos/admin-cursos.component';
import { AdminProfessoresComponent } from './componentes_admin/admin-professores/admin-professores.component';
import { ProfessorComponent } from './componentes_professor/professor/professor.component';
import { ProfessorCursoDetalhesComponent } from './componentes_professor/professor_curso_detalhes/professor-curso-detalhes/professor-curso-detalhes.component';
import { ProfessorAtividadeDetalhesComponent } from './componentes_professor/professor_atividade_detalhes/professor-atividade-detalhes/professor-atividade-detalhes.component';
import { CursoDetalhesComponent } from './componentes_aluno/curso-detalhes/curso-detalhes.component';
import { CursosComponent } from './componentes_aluno/cursos/cursos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'acesso-negado', component: LoginComponent },
  { path: 'home', component: AlunoComponent, canActivate: [UserRoleGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'admin/alunos', component: AdminAlunosComponent, canActivate: [AdminGuard] },
  { path: 'admin/cursos', component: AdminCursosComponent, canActivate: [AdminGuard] },
  { path: 'admin/professores', component: AdminProfessoresComponent, canActivate: [AdminGuard] },
  { path: 'aluno', component: AlunoComponent, canActivate: [AuthGuard]},
  { path: 'aluno/curso/:id_disciplina', component: CursoDetalhesComponent, canActivate: [AuthGuard] },
  { path: 'professor', component: ProfessorComponent, canActivate: [AuthGuard]},
  { path: 'professor/curso/:id_disciplina', component: ProfessorCursoDetalhesComponent, canActivate: [AuthGuard] },
  { path: 'professor/curso/:id_disciplina/atividade/:id_atividade', component: ProfessorAtividadeDetalhesComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
