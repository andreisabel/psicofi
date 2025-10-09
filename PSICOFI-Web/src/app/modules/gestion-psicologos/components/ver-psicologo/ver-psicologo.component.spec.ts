import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPsicologoComponent } from './ver-psicologo.component';

describe('VerPsicologoComponent', () => {
  let component: VerPsicologoComponent;
  let fixture: ComponentFixture<VerPsicologoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPsicologoComponent]
    });
    fixture = TestBed.createComponent(VerPsicologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
