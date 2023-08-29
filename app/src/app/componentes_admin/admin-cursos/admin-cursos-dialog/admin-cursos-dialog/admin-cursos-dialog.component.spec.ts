import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCursosDialogComponent } from './admin-cursos-dialog.component';

describe('AdminCursosDialogComponent', () => {
  let component: AdminCursosDialogComponent;
  let fixture: ComponentFixture<AdminCursosDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCursosDialogComponent]
    });
    fixture = TestBed.createComponent(AdminCursosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
