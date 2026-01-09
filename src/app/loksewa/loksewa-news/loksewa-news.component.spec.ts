import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoksewaNewsComponent } from './loksewa-news.component';

describe('LoksewaNewsComponent', () => {
  let component: LoksewaNewsComponent;
  let fixture: ComponentFixture<LoksewaNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoksewaNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoksewaNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
