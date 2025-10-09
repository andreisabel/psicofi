import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosReporteCitaComponent } from './datos-reporte-cita.component';

describe('DatosReporteCitaComponent', () => {
  let component: DatosReporteCitaComponent;
  let fixture: ComponentFixture<DatosReporteCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosReporteCitaComponent]
    });
    fixture = TestBed.createComponent(DatosReporteCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
