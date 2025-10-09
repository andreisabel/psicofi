import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAtendidoComponent } from './alumno-atendido.component';

describe('AlumnoAtendidoComponent', () => {
  let component: AlumnoAtendidoComponent;
  let fixture: ComponentFixture<AlumnoAtendidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnoAtendidoComponent]
    });
    fixture = TestBed.createComponent(AlumnoAtendidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
