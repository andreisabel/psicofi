import { TestBed } from '@angular/core/testing';

import { ReporteCitasService } from './reporte-citas.service';

describe('ReporteCitasService', () => {
  let service: ReporteCitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteCitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
