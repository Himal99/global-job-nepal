import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vc1Component } from './vc1.component';

describe('Vc1Component', () => {
  let component: Vc1Component;
  let fixture: ComponentFixture<Vc1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vc1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
