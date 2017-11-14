import {inject, TestBed} from '@angular/core/testing';

import {LocationService} from './location.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('LocationService', () => {
  let locationService: LocationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService]
    });

    locationService = TestBed.get(LocationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));

  it('should return error if country request failed', (done) => {
    locationService.getLocations()
      .subscribe((res: any) => {
        expect(res.failure.error.type).toBe('ERROR_LOADING_COUNTRIES');
        done();
      });

    const countryRequest = httpMock.expectOne('./assets/countries.json');
    countryRequest.error(new ErrorEvent('ERROR_LOADING_COUNTRIES'));

    httpMock.verify();
  });

  it('should return error if usa request failed', (done) => {
    locationService.getLocations()
      .subscribe((res: any) => {
        expect(res.failure.error.type).toBe('ERROR_LOADING_COUNTRY');
        done();
      });
    const countryRequest = httpMock.expectOne('./assets/countries.json');
    countryRequest.flush({countries: ['usa', 'norway']});

    const norwayRequest = httpMock.expectOne('./assets/norway.json');
    norwayRequest.flush({cities: ['Oslo', 'Bergen', 'Trondheim']});

    const usaRequest = httpMock.expectOne('./assets/usa2.json');
    usaRequest.error(new ErrorEvent('ERROR_LOADING_COUNTRY'));

    httpMock.verify();
  });

  it('should return error if norway request failed', (done) => {
    locationService.getLocations()
      .subscribe((res: any) => {
        expect(res.failure.error.type).toBe('ERROR_LOADING_COUNTRY');
        done();
      });
    const countryRequest = httpMock.expectOne('./assets/countries.json');
    countryRequest.flush({countries: ['usa', 'norway']});

    const usaRequest = httpMock.expectOne('./assets/usa2.json');
    usaRequest.flush({cities: ['New York', 'Chicago', 'Denver']});

    const norwayRequest = httpMock.expectOne('./assets/norway.json');
    norwayRequest.error(new ErrorEvent('ERROR_LOADING_COUNTRY'));

    httpMock.verify();
  });

  it('should successfully get countries and cities', (done) => {
    locationService.getLocations()
      .subscribe(res => {
        expect(res).toEqual(
          [
            {country: 'USA', cities: ['New York', 'Chicago', 'Denver']},
            {country: 'NORWAY', cities: ['Oslo', 'Bergen', 'Trondheim']}
          ]
        );
        done();
      });

    const countryRequest = httpMock.expectOne('./assets/countries.json');
    countryRequest.flush({countries: ['usa', 'norway']});

    const usaRequest = httpMock.expectOne('./assets/usa2.json');
    usaRequest.flush({cities: ['New York', 'Chicago', 'Denver']});

    const norwayRequest = httpMock.expectOne('./assets/norway.json');
    norwayRequest.flush({cities: ['Oslo', 'Bergen', 'Trondheim']});

    httpMock.verify();
  });
});
