import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCursoAddAlunosDialogComponent } from './professor-curso-add-alunos-dialog.component';

describe('ProfessorCursoAddAlunosDialogComponent', () => {
  let component: ProfessorCursoAddAlunosDialogComponent;
  let fixture: ComponentFixture<ProfessorCursoAddAlunosDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorCursoAddAlunosDialogComponent]
    });
    fixture = TestBed.createComponent(ProfessorCursoAddAlunosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
