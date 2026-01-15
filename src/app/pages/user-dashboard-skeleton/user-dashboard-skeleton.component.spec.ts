import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardSkeletonComponent } from './user-dashboard-skeleton.component';

describe('UserDashboardSkeletonComponent', () => {
  let component: UserDashboardSkeletonComponent;
  let fixture: ComponentFixture<UserDashboardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashboardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashboardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
