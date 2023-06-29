import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos/cursos.component';
import { CursoDetalhesComponent } from './curso-detalhes/curso-detalhes.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/authguard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: CursosComponent, canActivate: [AuthGuard] },
  { path: 'curso/:id', component: CursoDetalhesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
