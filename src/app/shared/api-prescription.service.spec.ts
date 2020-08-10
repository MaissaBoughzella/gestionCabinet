import { TestBed } from '@angular/core/testing';

import { ApiPrescriptionService } from './api-prescription.service';

describe('ApiPrescriptionService', () => {
  let service: ApiPrescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPrescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
