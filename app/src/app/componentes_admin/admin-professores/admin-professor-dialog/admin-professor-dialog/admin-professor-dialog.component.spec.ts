import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfessorDialogComponent } from './admin-professor-dialog.component';

describe('AdminProfessorDialogComponent', () => {
  let component: AdminProfessorDialogComponent;
  let fixture: ComponentFixture<AdminProfessorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProfessorDialogComponent]
    });
    fixture = TestBed.createComponent(AdminProfessorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
