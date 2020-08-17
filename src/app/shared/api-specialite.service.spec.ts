import { TestBed } from '@angular/core/testing';

import { ApiSpecialiteService } from './api-specialite.service';

describe('ApiSpecialiteService', () => {
  let service: ApiSpecialiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSpecialiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
