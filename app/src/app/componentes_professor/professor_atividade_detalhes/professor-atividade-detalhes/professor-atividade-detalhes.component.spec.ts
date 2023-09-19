import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorAtividadeDetalhesComponent } from './professor-atividade-detalhes.component';

describe('ProfessorAtividadeDetalhesComponent', () => {
  let component: ProfessorAtividadeDetalhesComponent;
  let fixture: ComponentFixture<ProfessorAtividadeDetalhesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorAtividadeDetalhesComponent]
    });
    fixture = TestBed.createComponent(ProfessorAtividadeDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
