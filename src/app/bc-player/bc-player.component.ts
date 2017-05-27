import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'bc-player',
  templateUrl: './bc-player.component.html',
  styleUrls: ['./bc-player.component.css']
})
export class BcPlayerComponent implements OnInit {

    @ViewChild('iframe') iframe: ElementRef;
	@Input("embed") embed;

	constructor() { 
	}

	ngOnInit() {
	}

}
