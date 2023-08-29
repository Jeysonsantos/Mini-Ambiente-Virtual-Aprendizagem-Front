import { TestBed } from '@angular/core/testing';

import { AdminDisciServiceService } from './admin-disci-service.service';

describe('AdminDisciServiceService', () => {
  let service: AdminDisciServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDisciServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
