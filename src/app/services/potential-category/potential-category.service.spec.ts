import {TestBed} from '@angular/core/testing';

import {PotentialCategoryService} from './potential-category.service';

describe('PotentialCategoryService', () => {
  let service: PotentialCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotentialCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
