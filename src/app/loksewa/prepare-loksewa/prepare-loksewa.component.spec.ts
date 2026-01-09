import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareLoksewaComponent } from './prepare-loksewa.component';

describe('PrepareLoksewaComponent', () => {
  let component: PrepareLoksewaComponent;
  let fixture: ComponentFixture<PrepareLoksewaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepareLoksewaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepareLoksewaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
