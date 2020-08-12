import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSecretaireComponent } from './profile-secretaire.component';

describe('ProfileSecretaireComponent', () => {
  let component: ProfileSecretaireComponent;
  let fixture: ComponentFixture<ProfileSecretaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSecretaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSecretaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
