import { TestBed } from '@angular/core/testing';

import { FbGuard } from './fb.guard';

describe('FbGuard', () => {
  let guard: FbGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FbGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
