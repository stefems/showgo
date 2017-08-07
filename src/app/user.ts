export class User {
	private venues = [];
	private accessToken = "";
	private displayName = "";
  	private dbId: "";
  	private fbId: "";
  	private ignoredList = [];
  	private friends = [];
  	private events = [];
  	private picture = "";
  	private friendSuggestions = [];
  	private friendNotifications = 0;
  	private inviteNotifications = 0;
  	private eventInvites = [];
  	private invitesSent = [];

	constructor(inputJson: any) {
		if (inputJson !== 0) {
			this.dbId = inputJson._id;
			this.fbId = inputJson.id;
			this.displayName = inputJson.name;
			this.ignoredList = inputJson.show_ignored;
			this.venues = inputJson.venue_pages;
			this.accessToken = inputJson.access_token;
			this.friends = inputJson.friends;
			this.events = inputJson.events;
			this.picture = inputJson.picture;
			this.friendSuggestions = inputJson.friendSuggestions;
			this.friendNotifications = inputJson.friendNotifications;
			this.inviteNotifications = inputJson.inviteNotifications;
			this.eventInvites = inputJson.eventInvites;
			this.invitesSent = inputJson.invitesSent;
			//use the id to get from DB to populate other data
		}
		else {
			this.dbId = "";
			this.fbId = "";
			this.displayName = "";
			this.ignoredList = [];
			this.venues = [];
			this.accessToken = "";
			this.picture = "";
			this.friendSuggestions = [];
			this.friendNotifications = 0;
			this.inviteNotifications = 0;
			this.eventInvites = [];
			this.invitesSent = [];
		}
	}

	createUser(dbId) {
		console.log(dbId);
	}
}
