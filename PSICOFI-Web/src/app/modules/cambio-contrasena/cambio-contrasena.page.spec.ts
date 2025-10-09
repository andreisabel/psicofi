import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioContrasenaPage } from './cambio-contrasena.page';

describe('CambioContrasenaPage', () => {
  let component: CambioContrasenaPage;
  let fixture: ComponentFixture<CambioContrasenaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambioContrasenaPage]
    });
    fixture = TestBed.createComponent(CambioContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
