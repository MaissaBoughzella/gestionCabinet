import { TestBed } from '@angular/core/testing';

import { ApiConsultationService } from './api-consultation.service';

describe('ApiConsultationService', () => {
  let service: ApiConsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConsultationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
