import { TestBed } from '@angular/core/testing';

import { JugadoreServiceService } from './jugadore-service.service';

describe('JugadoreServiceService', () => {
  let service: JugadoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
