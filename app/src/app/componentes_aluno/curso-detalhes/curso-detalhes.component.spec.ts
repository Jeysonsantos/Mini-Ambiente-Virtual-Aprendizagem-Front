import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoDetalhesComponent } from './curso-detalhes.component';

describe('CursoDetalhesComponent', () => {
  let component: CursoDetalhesComponent;
  let fixture: ComponentFixture<CursoDetalhesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursoDetalhesComponent]
    });
    fixture = TestBed.createComponent(CursoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
