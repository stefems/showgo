export class Event {
	private name: string;
	public fbId: string;
	private dbId: string; 
	private venue: string;
	private location: string;
	private timeString: string;
	private time: string;
	private social;
	private bcEmbeds;
	private scEmbeds;
	private bands;
	private invitedByNames: string;
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
			let timeHour = "";
			if (parseInt(inputJson.eventTime.eventHour.slice(0, 2)) < 12) {
				timeHour = inputJson.eventTime.eventHour + "am";
			}
			else if (parseInt(inputJson.eventTime.eventHour.slice(0, 2)) > 12) {
				timeHour = (parseInt(inputJson.eventTime.eventHour.slice(0, 2)) % 12) + (inputJson.eventTime.eventHour.slice(2)) + "pm";
			}
			else {
				timeHour = inputJson.eventTime.eventHour + "pm";
			}
			this.timeString = inputJson.eventTime.eventMonth + " " + inputJson.eventTime.eventDay + " at " + timeHour;
			this.social = inputJson.social;
			this.bcEmbeds = inputJson.bcEmbeds;
			this.scEmbeds = inputJson.scEmbeds;
			this.bands = inputJson.bands;
			this.time = inputJson.eventTime.start_time;
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
			this.time = "";
		}
		this.invitedByNames = "";
		//use the id to get from DB to populate other data
	}
}
