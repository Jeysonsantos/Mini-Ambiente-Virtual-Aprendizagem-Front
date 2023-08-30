import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCursosComponent } from './professor-cursos.component';

describe('ProfessorCursosComponent', () => {
  let component: ProfessorCursosComponent;
  let fixture: ComponentFixture<ProfessorCursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorCursosComponent]
    });
    fixture = TestBed.createComponent(ProfessorCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
