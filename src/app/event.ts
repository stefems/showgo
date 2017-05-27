export class Event {
	private name: string;
	private fbId: string;
	private dbId: string; 
	private venue: string;
	private location: string;
	private timeString: string;
	private social;
	private bcEmbeds;
	private scEmbeds;
	private bands;
	//TODO: add this shit, yo
	constructor(inputJson: any) {
		this.name = inputJson.eventName;
		this.venue = inputJson.eventVenue;
		this.fbId = inputJson.eventId;
		this.dbId = inputJson._id;
		this.location = inputJson.eventPlace;
		this.timeString = inputJson.eventTime.eventMonth + " " + inputJson.eventTime.eventDay + " at " + inputJson.eventTime.eventHour;
		this.social = inputJson.social;
		this.bcEmbeds = inputJson.bcEmbeds;
		this.scEmbeds = inputJson.scEmbeds;
		this.bands = inputJson.bands;
		//use the id to get from DB to populate other data
	}
}
