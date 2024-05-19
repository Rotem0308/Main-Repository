import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { discountResolver } from './discount.resolver';

describe('discountResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => discountResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
