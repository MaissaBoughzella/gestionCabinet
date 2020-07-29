import { TestBed } from '@angular/core/testing';

import { ApiSecretaireService } from './api-secretaire.service';

describe('ApiSecretaireService', () => {
  let service: ApiSecretaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSecretaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
