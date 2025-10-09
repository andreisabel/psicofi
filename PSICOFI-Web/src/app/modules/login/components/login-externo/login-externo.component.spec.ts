import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginExternoComponent } from './login-externo.component';

describe('LoginExternoComponent', () => {
  let component: LoginExternoComponent;
  let fixture: ComponentFixture<LoginExternoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginExternoComponent]
    });
    fixture = TestBed.createComponent(LoginExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
