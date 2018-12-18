import { Component, OnInit, Input } from '@angular/core';
import { SolutionElement } from '@lcu/elements';
import { ForgeSolutionService } from '@lcu/daf-common';

@Component({
	selector: 'forge-solution-element',
	templateUrl: './solution-element.component.html',
	styleUrls: ['./solution-element.component.scss'],
	host: {
		'[style.display]': '"contents"'
	}
})
export class SolutionElementComponent implements OnInit {
	//	Fields

	//	Properties
	@Input('solution')
	public Solution: SolutionElement;

	@Input('state')
	public State: 'Documentation' | 'Heading' | 'Manage' | 'Marketplace' | 'Overview';

	//	Constructors
	constructor(protected slnSvc: ForgeSolutionService) {
	}

	//	Life Cycle
	public ngOnInit() {
	}

	//	API Methods

	//	Helpers
}
