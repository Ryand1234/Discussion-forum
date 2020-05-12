import { TestBed } from '@angular/core/testing';

import { GetThreadService } from './get-thread.service';

describe('GetThreadService', () => {
  let service: GetThreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetThreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
