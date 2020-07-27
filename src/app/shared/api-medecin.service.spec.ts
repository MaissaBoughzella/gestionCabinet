import { TestBed } from '@angular/core/testing';

import { ApiMedecinService } from './api-medecin.service';

describe('ApiMedecinService', () => {
  let service: ApiMedecinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMedecinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
