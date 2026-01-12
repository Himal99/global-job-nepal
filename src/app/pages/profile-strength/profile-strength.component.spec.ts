import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStrengthComponent } from './profile-strength.component';

describe('ProfileStrengthComponent', () => {
  let component: ProfileStrengthComponent;
  let fixture: ComponentFixture<ProfileStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileStrengthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
