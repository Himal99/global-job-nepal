import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoksewaMcqComponent } from './loksewa-mcq.component';

describe('LoksewaMcqComponent', () => {
  let component: LoksewaMcqComponent;
  let fixture: ComponentFixture<LoksewaMcqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoksewaMcqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoksewaMcqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
