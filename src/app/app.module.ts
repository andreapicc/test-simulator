import { Globals } from './globals';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
import { ResultComponent } from './pages/result/result.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		SimulationComponent,
		ResultComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule
	],
	providers: [Globals],
	bootstrap: [AppComponent]
})
export class AppModule { }
