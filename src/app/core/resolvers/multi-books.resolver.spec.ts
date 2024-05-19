import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { multiBooksResolver } from './multi-books.resolver';

describe('multiBooksResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => multiBooksResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
