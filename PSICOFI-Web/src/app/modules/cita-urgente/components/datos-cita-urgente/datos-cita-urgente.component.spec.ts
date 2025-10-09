import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCitaUrgenteComponent } from './datos-cita-urgente.component';

describe('DatosReporteCitaComponent', () => {
  let component: DatosCitaUrgenteComponent;
  let fixture: ComponentFixture<DatosCitaUrgenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosCitaUrgenteComponent]
    });
    fixture = TestBed.createComponent(DatosCitaUrgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
