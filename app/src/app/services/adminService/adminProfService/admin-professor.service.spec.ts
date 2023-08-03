/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminProfessorService } from './admin-professor.service';

describe('Service: AdminProfessor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminProfessorService]
    });
  });

  it('should ...', inject([AdminProfessorService], (service: AdminProfessorService) => {
    expect(service).toBeTruthy();
  }));
});
