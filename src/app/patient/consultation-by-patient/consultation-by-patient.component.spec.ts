import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationByPatientComponent } from './consultation-by-patient.component';

describe('ConsultationByPatientComponent', () => {
  let component: ConsultationByPatientComponent;
  let fixture: ComponentFixture<ConsultationByPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationByPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationByPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
