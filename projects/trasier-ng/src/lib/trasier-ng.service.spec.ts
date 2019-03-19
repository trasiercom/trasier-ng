import { TestBed } from '@angular/core/testing';

import { TrasierNgService } from './trasier-ng.service';

describe('TrasierNgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrasierNgService = TestBed.get(TrasierNgService);
    expect(service).toBeTruthy();
  });
});
