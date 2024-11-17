import { TestBed } from '@angular/core/testing';

import { CinedataService } from './cinedata.service';

describe('CinedataService', () => {
  let service: CinedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
