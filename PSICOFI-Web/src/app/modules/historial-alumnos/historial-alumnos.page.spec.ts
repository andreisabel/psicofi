import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAlumnosPage } from './historial-alumnos.page';

describe('HistorialAlumnosPage', () => {
  let component: HistorialAlumnosPage;
  let fixture: ComponentFixture<HistorialAlumnosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialAlumnosPage]
    });
    fixture = TestBed.createComponent(HistorialAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
