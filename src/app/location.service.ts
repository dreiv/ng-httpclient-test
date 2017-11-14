import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) {
  }

  getLocations(): Observable<any> {
    return this.http
      .get('./assets/countries.json')
      .flatMap((data: any) => Observable
        .forkJoin(data.countries
          .map((country: string) => this.http
            .get(`./assets/${country}.json`)
            .map((locations: any) => {
              return {country: country.toUpperCase(), cities: locations.cities};
            })))
      ).catch(e => Observable.of({failure: e}));
  }

}
