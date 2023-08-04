import { UserDataServiceService } from 'src/app/services/adminService/userDataService/user-data-service.service';
import { AlunoService } from './../../services/alunoService/aluno.service';
import { Component } from '@angular/core';
import { Aluno } from 'src/app/models/Aluno';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss']
})
export class AlunoComponent {
  aluno: Aluno | undefined;

  constructor(private AlunoService: AlunoService, private userDataServiceService: UserDataServiceService) {}

  ngOnInit(): void {
    this.AlunoService.getAlunoById(this.userDataServiceService.idUsuario).subscribe((aluno: any) => {
      this.aluno = aluno;
      this.userDataServiceService.setEmail(aluno.email);
    }
    );
  }
}
