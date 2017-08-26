import { Injectable } from '@angular/core';
import { AuthService }      from './auth.service';


@Injectable()
export class FilterService {

	public genres = [];
	public venues = [];
	user: any;

	constructor(private authService: AuthService) {

		this.authService.user().subscribe(response => {
      		this.user = response;
		});
	}
}
