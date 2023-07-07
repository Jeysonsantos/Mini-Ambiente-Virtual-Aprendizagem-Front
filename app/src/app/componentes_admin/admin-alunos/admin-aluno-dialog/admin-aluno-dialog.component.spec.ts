import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlunoDialogComponent } from './admin-aluno-dialog.component';

describe('AdminAlunoDialogComponent', () => {
  let component: AdminAlunoDialogComponent;
  let fixture: ComponentFixture<AdminAlunoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAlunoDialogComponent]
    });
    fixture = TestBed.createComponent(AdminAlunoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
