import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfessorExcluirDialogComponent } from './admin-professor-excluir-dialog.component';

describe('AdminProfessorExcluirDialogComponent', () => {
  let component: AdminProfessorExcluirDialogComponent;
  let fixture: ComponentFixture<AdminProfessorExcluirDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProfessorExcluirDialogComponent]
    });
    fixture = TestBed.createComponent(AdminProfessorExcluirDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
