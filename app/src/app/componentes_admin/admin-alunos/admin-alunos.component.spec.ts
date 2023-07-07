import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlunosComponent } from './admin-alunos.component';

describe('AdminAlunosComponent', () => {
  let component: AdminAlunosComponent;
  let fixture: ComponentFixture<AdminAlunosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAlunosComponent]
    });
    fixture = TestBed.createComponent(AdminAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
