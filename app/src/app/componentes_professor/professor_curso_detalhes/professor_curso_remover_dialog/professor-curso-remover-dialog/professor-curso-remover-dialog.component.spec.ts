import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCursoRemoverDialogComponent } from './professor-curso-remover-dialog.component';

describe('ProfessorCursoRemoverDialogComponent', () => {
  let component: ProfessorCursoRemoverDialogComponent;
  let fixture: ComponentFixture<ProfessorCursoRemoverDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorCursoRemoverDialogComponent]
    });
    fixture = TestBed.createComponent(ProfessorCursoRemoverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
