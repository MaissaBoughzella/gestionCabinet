import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnancePatientComponent } from './ordonnance-patient.component';

describe('OrdonnancePatientComponent', () => {
  let component: OrdonnancePatientComponent;
  let fixture: ComponentFixture<OrdonnancePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdonnancePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdonnancePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
