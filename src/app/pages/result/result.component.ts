import { Router } from '@angular/router';
import { Globals } from './../../globals';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

	result: any;
	score: number;

	constructor(
		public global: Globals,
		private router: Router) {
		this.score = 0;
	}

	ngOnInit() {
		if (typeof this.global.result !== 'undefined' && this.global.result !== null && this.global.result.length > 0 ) {
			this.result = this.global.result;
			this.score = 100 * this.result.reduce((acc, val) => acc + val.score, 0) / this.result.length;
			this.score = Math.round((this.score + Number.EPSILON) * 100) / 100;
		} else {
			this.router.navigate(['/home']);
		}
	}

}
