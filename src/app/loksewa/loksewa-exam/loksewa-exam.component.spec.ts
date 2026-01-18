import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoksewaExamComponent } from './loksewa-exam.component';

describe('LoksewaExamComponent', () => {
  let component: LoksewaExamComponent;
  let fixture: ComponentFixture<LoksewaExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoksewaExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoksewaExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
