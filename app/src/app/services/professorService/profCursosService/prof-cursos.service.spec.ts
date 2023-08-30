import { TestBed } from '@angular/core/testing';

import { ProfCursosService } from './prof-cursos.service';

describe('ProfCursosService', () => {
  let service: ProfCursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfCursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
