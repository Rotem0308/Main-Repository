import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminInfoGuard } from './admin-info.guard';

describe('adminInfoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminInfoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
