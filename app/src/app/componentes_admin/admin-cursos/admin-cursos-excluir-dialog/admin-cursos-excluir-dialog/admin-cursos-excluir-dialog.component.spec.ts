import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCursosExcluirDialogComponent } from './admin-cursos-excluir-dialog.component';

describe('AdminCursosExcluirDialogComponent', () => {
  let component: AdminCursosExcluirDialogComponent;
  let fixture: ComponentFixture<AdminCursosExcluirDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCursosExcluirDialogComponent]
    });
    fixture = TestBed.createComponent(AdminCursosExcluirDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
