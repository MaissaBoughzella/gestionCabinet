import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRadioComponent } from './type-radio.component';

describe('TypeRadioComponent', () => {
  let component: TypeRadioComponent;
  let fixture: ComponentFixture<TypeRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
