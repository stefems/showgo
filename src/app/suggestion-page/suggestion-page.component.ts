import { Component, OnInit } from '@angular/core';
import { AuthService }      from './../auth.service';


@Component({
  selector: 'app-suggestion-page',
  templateUrl: './suggestion-page.component.html',
  styleUrls: ['./suggestion-page.component.css']
})
export class SuggestionPageComponent implements OnInit {

	private user;

	constructor(private authService: AuthService) {
		this.authService.user().subscribe(response => {
			this.user = response;
		});
	}

	ngOnInit() {
	
	}

}
