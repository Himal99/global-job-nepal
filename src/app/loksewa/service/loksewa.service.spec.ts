import { TestBed } from '@angular/core/testing';

import { LoksewaService } from './loksewa.service';

describe('LoksewaService', () => {
  let service: LoksewaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoksewaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
