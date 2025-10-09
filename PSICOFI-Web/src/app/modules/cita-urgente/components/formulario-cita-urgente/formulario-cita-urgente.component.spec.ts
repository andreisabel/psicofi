import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCitaUrgenteComponent } from './formulario-cita-urgente.component';

describe('FormularioReporteCitaComponent', () => {
  let component: FormularioCitaUrgenteComponent;
  let fixture: ComponentFixture<FormularioCitaUrgenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCitaUrgenteComponent]
    });
    fixture = TestBed.createComponent(FormularioCitaUrgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
