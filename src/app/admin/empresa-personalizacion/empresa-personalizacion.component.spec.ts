import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaPersonalizacionComponent } from './empresa-personalizacion.component';

describe('EmpresaPersonalizacionComponent', () => {
  let component: EmpresaPersonalizacionComponent;
  let fixture: ComponentFixture<EmpresaPersonalizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaPersonalizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaPersonalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
