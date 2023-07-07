import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfessoresComponent } from './admin-professores.component';

describe('AdminProfessoresComponent', () => {
  let component: AdminProfessoresComponent;
  let fixture: ComponentFixture<AdminProfessoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProfessoresComponent]
    });
    fixture = TestBed.createComponent(AdminProfessoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
