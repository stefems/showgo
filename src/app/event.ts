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
	public friendString : string;
	//TODO: add this shit, yo
	constructor(inputJson: any) {
		this.friendString = "";
		if (inputJson !== 0) {
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
		}
		else {
			this.name = "";
			this.venue = "";
			this.fbId = "";
			this.dbId = "";
			this.location = "";
			this.timeString = "";
			this.bcEmbeds = [];
			this.scEmbeds = [];
			this.bands = [];
			this.social = [];
		}
		//use the id to get from DB to populate other data
	}
}
