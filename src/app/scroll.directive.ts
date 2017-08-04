import { Directive, ElementRef, Input, Output, EventEmitter} from '@angular/core';

@Directive({ selector: '[myScroll]' })
export class ScrollDirective {

	private currentScroll: number;
	@Output()
  	loadMoreEventsEmitter:EventEmitter<any> = new EventEmitter();

    constructor(el: ElementRef) {
    	this.currentScroll = el.nativeElement.scrollTop;
    	el.nativeElement.addEventListener("scroll", function() {
    		//if they're the same and the scroll value isn't at the top, that
    		//  means that they reached the bottom.
    		console.log(this.currentScroll + " -> " + el.nativeElement.scrollTop);
    		if (this.currentScroll === el.nativeElement.scrollTop && el.nativeElement.scrollTop !== 0) {
    			console.log("attempting to emit.");
    			this.loadMoreEventsEmitter.emit({});
    		}
    		this.currentScroll = el.nativeElement.scrollTop;

    	}); 
    }
}