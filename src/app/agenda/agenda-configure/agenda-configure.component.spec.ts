import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaConfigureComponent } from './agenda-configure.component';

describe('AgendaConfigureComponent', () => {
  let component: AgendaConfigureComponent;
  let fixture: ComponentFixture<AgendaConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
