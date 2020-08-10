import { TestBed } from '@angular/core/testing';

import { ApiRadioService } from './api-radio.service';

describe('ApiRadioService', () => {
  let service: ApiRadioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRadioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
