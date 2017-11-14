import {inject, TestBed} from '@angular/core/testing';

import {LocationService} from './location.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService]
    });
  });

  it('should be created', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));
});
