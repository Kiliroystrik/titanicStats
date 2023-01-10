import { TestBed } from '@angular/core/testing';

import { PassengersService } from './passengers.service';

describe('PassengersService', () => {
  let service: PassengersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
