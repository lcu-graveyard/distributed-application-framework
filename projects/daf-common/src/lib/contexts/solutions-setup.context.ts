import { BaseConfigContext, SingletonService } from '@lcu/enterprises';
import { Injectable } from '@angular/core';
import { SolutionsSetup } from '@lcu/elements';

@Injectable({
	providedIn: 'root'
})
export class SolutionsSetupContext extends BaseConfigContext<SolutionsSetup> {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected configSvc: SingletonService) {
		super(configSvc);
	}

	//	API Methods

	//	Helpers
	protected loadConfigKey() {
		return `Solutions`;
	}

	protected loadDefaultConfig(): SolutionsSetup {
		return { Configs: [] };
	}
}
