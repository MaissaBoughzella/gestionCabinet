import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientByIdComponent } from './patient-by-id.component';

describe('PatientByIdComponent', () => {
  let component: PatientByIdComponent;
  let fixture: ComponentFixture<PatientByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
