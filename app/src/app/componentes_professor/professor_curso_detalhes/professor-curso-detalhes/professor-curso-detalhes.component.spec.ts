import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCursoDetalhesComponent } from './professor-curso-detalhes.component';

describe('ProfessorCursoDetalhesComponent', () => {
  let component: ProfessorCursoDetalhesComponent;
  let fixture: ComponentFixture<ProfessorCursoDetalhesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorCursoDetalhesComponent]
    });
    fixture = TestBed.createComponent(ProfessorCursoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
