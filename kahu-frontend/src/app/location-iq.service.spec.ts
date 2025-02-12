import { TestBed } from '@angular/core/testing';

import { LocationIqService } from './location-iq.service';

describe('LocationIqService', () => {
  let service: LocationIqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationIqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
