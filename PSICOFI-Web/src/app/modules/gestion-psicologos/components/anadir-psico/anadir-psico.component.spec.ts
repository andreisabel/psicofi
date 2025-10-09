import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirPsicoComponent } from './anadir-psico.component';

describe('AnadirPsicoComponent', () => {
  let component: AnadirPsicoComponent;
  let fixture: ComponentFixture<AnadirPsicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnadirPsicoComponent]
    });
    fixture = TestBed.createComponent(AnadirPsicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
