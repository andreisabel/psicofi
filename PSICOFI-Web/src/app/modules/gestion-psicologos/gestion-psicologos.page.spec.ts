import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPsicologosPage } from './gestion-psicologos.page';

describe('GestionPsicologosPage', () => {
  let component: GestionPsicologosPage;
  let fixture: ComponentFixture<GestionPsicologosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionPsicologosPage]
    });
    fixture = TestBed.createComponent(GestionPsicologosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
