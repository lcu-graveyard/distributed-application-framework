import { Injectable, Inject } from '@angular/core';
import { BaseConfigContext, SingletonService } from '@lcu/enterprises';
import { PagesSetup } from '@lcu/elements';

@Injectable({
	providedIn: 'root'
})
export class PagesSetupContext extends BaseConfigContext<PagesSetup> {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected configSvc: SingletonService) {
		super(configSvc);
	}

	//	API Methods

	//	Helpers
	protected loadConfigKey() {
		return `Pages-${this.AppID}`;
	}

	protected loadDefaultConfig(): PagesSetup {
		return { Configs: [] };
	}
}
