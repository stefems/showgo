import { Component, OnInit, Input } from '@angular/core';

// declare var SC:any;


@Component({
  selector: 'sc-player',
  templateUrl: './sc-player.component.html',
  styleUrls: ['./sc-player.component.css']
})
export class ScPlayerComponent implements OnInit {
  private widget;
  public scReady = false;
  private playing = false;

  @Input("trackId") track;

  constructor() { }

  ngOnInit() {
  	// var scId = "soundcloud_widget";
  	// this.widget = SC.Widget(scId);
  	// var ready = this.scReady;
  	// this.widget.bind(SC.Widget.Events.READY, () => {
  	// 	this.scReady = true;
  	// 	this.widget.play();
	  // });
  }

  public playTrack(): void {
  // 	if (this.playing) {
  // 		////change button to play
  // 		this.widget.pause();
  // 	}
  // 	else {

	 //  	this.widget.load('https://api.soundcloud.com/tracks/'+this.track);
	 //  	this.widget.bind(SC.Widget.Events.READY, () => {
	 //  		//change button to pause
		// 	this.widget.play();
		// });
	 }
  }
}
