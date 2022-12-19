import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInfoUsersComponent } from './form-info-users.component';

describe('FormInfoUsersComponent', () => {
  let component: FormInfoUsersComponent;
  let fixture: ComponentFixture<FormInfoUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInfoUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInfoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
