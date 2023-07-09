import { TestBed } from '@angular/core/testing';

import { AdminAlunoService } from './admin-aluno.service';

describe('AdminAlunoService', () => {
  let service: AdminAlunoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAlunoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
