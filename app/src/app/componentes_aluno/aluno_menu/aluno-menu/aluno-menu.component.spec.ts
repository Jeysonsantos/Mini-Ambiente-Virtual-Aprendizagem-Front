import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoMenuComponent } from './aluno-menu.component';

describe('AlunoMenuComponent', () => {
  let component: AlunoMenuComponent;
  let fixture: ComponentFixture<AlunoMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlunoMenuComponent]
    });
    fixture = TestBed.createComponent(AlunoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
