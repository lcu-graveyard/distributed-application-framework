import { Component, Input, OnInit, Type, DoCheck, Inject } from '@angular/core';
import { ISolutionDisplayConfig, SolutionDisplayConfig } from '@lcu/solutions';
import { SolutionElement, ISolutionsService } from '@lcu/elements';

@Component({
	selector: 'display-solution',
	templateUrl: './display-solution.component.html',
	styleUrls: ['./display-solution.component.scss'],
	host: {
		'[style.display]': '"contents"'
	}
})
export class DisplaySolutionComponent implements DoCheck, OnInit {
	//	Fields
	protected changeTracking: string;

	//	Properties
	@Input('config')
	public Config: ISolutionDisplayConfig;

	public get CurrentDisplay(): Type<any> {
		return this.Config && this.Config.State && this.Config.Solution && this.Config.Solution[this.Config.State]
			? this.Config.Solution[this.Config.State]() : null;
	}

	@Input('solution')
	public Solution: SolutionElement;

	@Input('state')
	public State: 'Documentation' | 'Heading' | 'Manage' | 'Marketplace' | 'Overview';

	//	Constructors
	constructor(protected solutionsSvc: ISolutionsService) {
		this.State = 'Overview';
	}

	//	Life Cycle
	public ngOnInit() {
		this.processControlConfig();
	}

	public ngDoCheck() {
		if (this.trackChanges() != this.changeTracking)
			this.processControlConfig();
	}

	//	API Methods
	public BuildSolutionConfiguration() {
		var base = this.Solution && this.Solution.Control ? this.Solution.Control.Base : '',
			type = this.Solution.Control ? this.Solution.Control.Type : '';

		var solutionConfig = this.solutionsSvc.ResolveSolutionModule(base, type);

		if (solutionConfig)
			return <SolutionDisplayConfig>{
				Solution: solutionConfig,
				Context: { Solution: this.Solution, State: this.State },
				State: this.State
			};
		else
			return null;
	}

	//	Helpers
	protected processControlConfig() {
		if (this.Solution)
			this.Config = this.BuildSolutionConfiguration();
		else if (this.Config)
			this.Config.State = this.State;

		this.changeTracking = this.trackChanges();
	}

	protected trackChanges() {
		var ctrl = this.Solution && this.Solution.Control ? this.Solution.Control.Base + this.Solution.Control.Type : '';

		return `${ctrl}-${this.State}`;
	}
}