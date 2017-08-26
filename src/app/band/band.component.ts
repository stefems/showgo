import { Component, OnInit, Input } from '@angular/core';
// declare var SC:any;

@Component({
  selector: 'band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.css']
})

export class BandComponent implements OnInit {

  private widget;
  private scReady = false;
  public bc;
  private playing = false;
  @Input("band") band;

  constructor() { }

  ngOnInit() {
   
  	if (this.band.bcUrl !== "") {
  		this.bc = true;
  		// this.scReady = false;
  	}
  // 	else {
		// this.widget = SC.Widget("soundcloud_widget");
		// this.widget.bind(SC.Widget.Events.READY, () => {
		// 	this.scReady = true;
		// });
  // 	}
  }

  public playTrack(): void {
  // 	if (this.playing) {
  // 		////change button to play
  // 		this.widget.pause();
  // 	}
  // 	else {
	 //  	this.widget.load('https://api.soundcloud.com/tracks/'+this.band.scId);
	 //  	this.widget.bind(SC.Widget.Events.READY, () => {
	 //  		//change button to pause
		// 	this.widget.play();
		// 	this.playing = true;
		// });
	 // }
  }
}

