import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {LocationService} from './location.service';
import {Observable} from 'rxjs/Observable';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: LocationService, useValue: {
            getLocations: () => Observable.of({})
          } as LocationService
        }
      ]
    });
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));
});
