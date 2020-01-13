import { Component, OnInit } from '@angular/core';
import { Globals } from './../../globals';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	csv: string;
	time: string;
    questions: Array<any>;
    rowSeparator = '\n';
    colSeparator = '	';
    shuffle: boolean;

	constructor(
		public global: Globals,
		private router: Router) {}

	ngOnInit() {
        this.time = '120';
        this.shuffle = false;
	}

	processCSV() {
		this.questions = [];
		const temp = this.csv.split(this.rowSeparator);
		temp.forEach(row => {
			let rowA = row.split(this.colSeparator);
			if (rowA[0] === 'q') {
				this.questions.push({q: rowA[1], a: []});
			} else {
				this.questions[this.questions.length - 1].a.push({
					i: this.questions[this.questions.length - 1].a.length,
					t: rowA[1],
					r: rowA[2] === 'true'
				});
			}
		});

		this.questions.forEach(qu => {
			qu.type = (qu.a.filter(x => x.r).length > 1) ? 'multi' : 'single';
		});
        if (this.shuffle) {
            this.questions.forEach(qu => {
                qu.a = this.shuffleArray(qu.a);
            });
            this.global.questions = this.shuffleArray(this.questions);
        } else {
            this.global.questions = this.questions;
        }
		this.global.time = parseInt(this.time, 10);
		this.router.navigate(['/simulation']);
	}

    shuffleArray(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

}
