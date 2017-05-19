export class Event {
	private name: string;
	private fbId: string;
	private dbId: string; 
	private venue: string;
	private location: string;
	private timeString: string;
	private social;
	//TODO: add this shit, yo
	constructor(inputJson: any) {
		this.name = inputJson.eventName;
		this.venue = inputJson.eventVenue;
		this.fbId = inputJson.eventId;
		this.dbId = inputJson._id;
		this.location = inputJson.eventPlace;
		this.timeString = inputJson.eventTime.eventMonth + " " + inputJson.eventTime.eventDay + " at " + inputJson.eventTime.eventHour;
		this.social = inputJson.social;
		//use the id to get from DB to populate other data
	}
}
