export class User {
	private venues = [];
	private displayName = "";
  	private oauthID: "";

	constructor(inputJson: any) {
		this.oauthID = inputJson.oauthID;
		this.displayName = inputJson.name;
		//use the id to get from DB to populate other data
	}

	createUser(dbId) {
		console.log(dbId);
	}
}
