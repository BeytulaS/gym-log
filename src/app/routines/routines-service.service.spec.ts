import { TestBed } from '@angular/core/testing';

import { RoutinesServiceService } from './routines-service.service';

describe('RoutinesServiceService', () => {
  let service: RoutinesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutinesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
