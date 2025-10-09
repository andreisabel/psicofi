import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReporteCitaComponent } from './formulario-reporte-cita.component';

describe('FormularioReporteCitaComponent', () => {
  let component: FormularioReporteCitaComponent;
  let fixture: ComponentFixture<FormularioReporteCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioReporteCitaComponent]
    });
    fixture = TestBed.createComponent(FormularioReporteCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
