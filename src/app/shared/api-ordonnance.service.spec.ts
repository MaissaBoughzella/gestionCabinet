import { TestBed } from '@angular/core/testing';

import { ApiOrdonnanceService } from './api-ordonnance.service';

describe('ApiOrdonnanceService', () => {
  let service: ApiOrdonnanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOrdonnanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
