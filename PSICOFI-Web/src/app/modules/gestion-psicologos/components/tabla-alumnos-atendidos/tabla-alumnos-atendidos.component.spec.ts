import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAlumnosAtendidosComponent } from './tabla-alumnos-atendidos.component';

describe('TablaAlumnosAtendidosComponent', () => {
  let component: TablaAlumnosAtendidosComponent;
  let fixture: ComponentFixture<TablaAlumnosAtendidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaAlumnosAtendidosComponent]
    });
    fixture = TestBed.createComponent(TablaAlumnosAtendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
