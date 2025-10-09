import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHistorialCitasComponent } from './tabla-historial-citas.component';

describe('TablaHistorialCitasComponent', () => {
  let component: TablaHistorialCitasComponent;
  let fixture: ComponentFixture<TablaHistorialCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaHistorialCitasComponent]
    });
    fixture = TestBed.createComponent(TablaHistorialCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
