import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlunoExcluirDialogComponent } from './admin-aluno-excluir-dialog.component';

describe('AdminAlunoExcluirDialogComponent', () => {
  let component: AdminAlunoExcluirDialogComponent;
  let fixture: ComponentFixture<AdminAlunoExcluirDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAlunoExcluirDialogComponent]
    });
    fixture = TestBed.createComponent(AdminAlunoExcluirDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
