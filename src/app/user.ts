export class User {
	private venues = [];
	private accessToken = "";
	private displayName = "";
  	private dbId: "";
  	private ignoredList = [];
  	private friends = [];
  	private events = [];

	constructor(inputJson: any) {
		if (inputJson !== 0) {
			this.dbId = inputJson._id;
			this.displayName = inputJson.name;
			this.ignoredList = inputJson.show_ignored;
			this.venues = inputJson.venue_pages;
			this.accessToken = inputJson.access_token;
			this.friends = inputJson.friends;
			this.events = inputJson.events;

			//use the id to get from DB to populate other data
		}
		else {
			this.dbId = "";
			this.displayName = "";
			this.ignoredList = [];
			this.venues = [];
			this.accessToken = "";
		}
	}

	createUser(dbId) {
		console.log(dbId);
	}
}
