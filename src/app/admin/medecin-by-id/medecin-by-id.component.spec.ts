import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinByIdComponent } from './medecin-by-id.component';

describe('MedecinByIdComponent', () => {
  let component: MedecinByIdComponent;
  let fixture: ComponentFixture<MedecinByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
