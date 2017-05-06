export class Event {
	private name: string;
	private fbId: string;
	private dbId: string; 
	//TODO: add this shit, yo
	constructor(inputJson: any) {
		this.name = inputJson.eventName;
		//use the id to get from DB to populate other data
	}
}
