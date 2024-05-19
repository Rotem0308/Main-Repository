import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { singleBookResolver } from './single-book.resolver';

describe('singleBookResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => singleBookResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
