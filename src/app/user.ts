export class User {
	private venues = [];
	private accessToken = "";
	private displayName = "";
  	private dbId: "";
  	private ignoredList = [];

	constructor(inputJson: any) {
		this.dbId = inputJson._id;
		this.displayName = inputJson.name;
		this.ignoredList = inputJson.show_ignored;
		this.venues = inputJson.venue_pages;
		this.accessToken = inputJson.access_token;

		//use the id to get from DB to populate other data
	}

	createUser(dbId) {
		console.log(dbId);
	}
}
