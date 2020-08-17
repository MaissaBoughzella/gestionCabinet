import { TestBed } from '@angular/core/testing';

import { ApiRolesService } from './api-roles.service';

describe('ApiRolesService', () => {
  let service: ApiRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
