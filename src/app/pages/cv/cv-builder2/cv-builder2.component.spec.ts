import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvBuilder2Component } from './cv-builder2.component';

describe('CvBuilder2Component', () => {
  let component: CvBuilder2Component;
  let fixture: ComponentFixture<CvBuilder2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvBuilder2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvBuilder2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
