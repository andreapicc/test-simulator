import { Router } from '@angular/router';
import { Globals } from './../../globals';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
	selector: 'app-simulation',
	templateUrl: './simulation.component.html',
	styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {

	questions: any;
	answer: any;
	currentQuestion: any;
	currentIndex = 0;
	time: number;
    timeString: string;
    timer: any;

	constructor(
			public global: Globals,
			private router: Router) {
		this.answer = [];
		this.timeString = '';
	}

	ngOnInit() {
		if (typeof this.global.questions !== 'undefined' && this.global.questions !== null && this.global.questions.length > 0 ) {
			this.questions = this.global.questions;
			this.time = this.global.time * 60;
			this.timer = setInterval( () => {
                this.time = this.time - 1;
                if (this.time > 0) {
                    const duration = moment.duration(this.time, 'seconds');
                    if (duration.hours() > 0) {
                        this.timeString = 'Time remaining: ' + duration.hours() + ':' + duration.minutes() + ':' + duration.seconds();
                    } else {
                        this.timeString = 'Time remaining: ' + duration.minutes() + ':' + duration.seconds();
                    }
                } else {
                    this.timeString = 'Time remaining: 0';
                    clearInterval(this.timer);
                }
			}, 1000);
			this.processCurrentQuestion(this.questions[this.currentIndex]);
		} else {
			this.router.navigate(['/home']);
		}
	}

	processCurrentQuestion(question: any) {
		this.currentQuestion = question;
		if (this.currentQuestion.type === 'multi') {
			this.answer = this.currentQuestion.a.map(x => false);
		} else {
			this.answer = [];
		}
	}

	setCheckbox(a: any) {
		console.log(a);
	}

	setRadio(a: any) {
		console.log(a);
		this.answer = [];
		this.answer.push(a);
	}

	next() {
		if ( (this.currentQuestion.type === 'multi' && this.answer.filter(x=>x).length > 0) ||
			(this.currentQuestion.type === 'single' && this.answer.length > 0)) {
			// records the answer
			console.log(this.questions[this.currentIndex]);

			if (this.currentQuestion.type === 'multi') {
				for (let i = 0; i < this.questions[this.currentIndex].a.length; i++) {
					//this.questions[this.currentIndex].a[i].rt = this.answer[i];
					this.questions[this.currentIndex].a[i].rt = this.answer[this.questions[this.currentIndex].a[i].i];
				}
			} else {
				for (let i = 0; i < this.questions[this.currentIndex].a.length; i++) {
					this.questions[this.currentIndex].a[i].rt = this.questions[this.currentIndex].a[i].i === this.answer[0].i;
				}
			}

			// calculate score
			this.questions[this.currentIndex].score = (this.questions[this.currentIndex].a.reduce((acc, val) => {
				return val.r === val.rt ? acc + 1 : acc;
			}, 0) === this.questions[this.currentIndex].a.length) ? 1 : 0;

			this.currentIndex = this.currentIndex + 1;
				// shows next question
			if (this.questions.length > this.currentIndex) {
				this.processCurrentQuestion(this.questions[this.currentIndex]);
			} else {
				this.global.result = this.questions;
				this.router.navigate(['/result']);
			}

		} else {
			alert('please, fill an answer');
		}
	}
}
