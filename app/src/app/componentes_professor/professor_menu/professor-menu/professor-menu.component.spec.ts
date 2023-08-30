import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorMenuComponent } from './professor-menu.component';

describe('ProfessorMenuComponent', () => {
  let component: ProfessorMenuComponent;
  let fixture: ComponentFixture<ProfessorMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorMenuComponent]
    });
    fixture = TestBed.createComponent(ProfessorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
