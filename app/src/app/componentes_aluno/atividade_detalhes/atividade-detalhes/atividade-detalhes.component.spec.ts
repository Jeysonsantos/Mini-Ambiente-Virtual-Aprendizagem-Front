import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeDetalhesComponent } from './atividade-detalhes.component';

describe('AtividadeDetalhesComponent', () => {
  let component: AtividadeDetalhesComponent;
  let fixture: ComponentFixture<AtividadeDetalhesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtividadeDetalhesComponent]
    });
    fixture = TestBed.createComponent(AtividadeDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
