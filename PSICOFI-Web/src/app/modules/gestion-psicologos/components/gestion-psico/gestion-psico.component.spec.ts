import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPsicoComponent } from './gestion-psico.component';

describe('GestionPsicoComponent', () => {
  let component: GestionPsicoComponent;
  let fixture: ComponentFixture<GestionPsicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionPsicoComponent]
    });
    fixture = TestBed.createComponent(GestionPsicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
