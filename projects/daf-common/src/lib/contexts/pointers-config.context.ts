import { Injectable, Inject } from '@angular/core';
import { BaseConfigContext, SingletonService } from '@lcu/enterprises';
import { PointersConfig } from '@lcu/elements';

@Injectable({
	providedIn: 'root'
})
export class PointersConfigContext extends BaseConfigContext<PointersConfig> {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected configSvc: SingletonService) {
		super(configSvc);
	}

	//	API Methods

	//	Helpers
	protected loadConfigKey() {
		return `PointersConfig-${this.AppID}`;
	}

	protected loadDefaultConfig(): PointersConfig {
		return { Pointers: {} };
	}
}
