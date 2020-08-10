import { TestBed } from '@angular/core/testing';

import { ApiMedicamentService } from './api-medicament.service';

describe('ApiMedicamentService', () => {
  let service: ApiMedicamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMedicamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
