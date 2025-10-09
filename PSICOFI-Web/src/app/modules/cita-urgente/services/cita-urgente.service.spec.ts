import { TestBed } from '@angular/core/testing';

import { CitaUrgenteService } from './cita-urgente.service';

describe('CitaUrgenteService', () => {
  let service: CitaUrgenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitaUrgenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
