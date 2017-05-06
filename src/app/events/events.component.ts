import { Component, OnInit } from '@angular/core';
import { ApiService }      from './../api.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  private events = [];

  constructor(private apiService: ApiService) {
  	//hit the backend path (via an observer) to get the events from mongo
  	apiService.getEvents().subscribe(response => { 
      this.events = response; 
    });
  }

  ngOnInit() {
  }

}
