import { TestBed } from '@angular/core/testing';

import { ApiAnalyseService } from './api-analyse.service';

describe('ApiAnalyseService', () => {
  let service: ApiAnalyseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAnalyseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
