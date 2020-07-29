import { TestBed } from '@angular/core/testing';

import { ApiRdvService } from './api-rdv.service';

describe('ApiRdvService', () => {
  let service: ApiRdvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRdvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
