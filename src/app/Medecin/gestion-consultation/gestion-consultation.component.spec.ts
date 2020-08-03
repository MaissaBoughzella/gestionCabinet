import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionConsultationComponent } from './gestion-consultation.component';

describe('GestionConsultationComponent', () => {
  let component: GestionConsultationComponent;
  let fixture: ComponentFixture<GestionConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
