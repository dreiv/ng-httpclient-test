import {Component, OnInit} from '@angular/core';
import {LocationService} from './location.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  locations: Observable<any>;

  constructor(private location: LocationService) {
  }

  ngOnInit(): void {
    this.locations = this.location.getLocations();
  }
}
