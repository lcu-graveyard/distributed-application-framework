import { Injectable, Inject } from '@angular/core';
import { SingletonService, BaseConfigContext } from '@lcu/enterprises';
import { ForgeSettings } from '@lcu/apps';

@Injectable({
	providedIn: 'root'
})
export class ForgeSettingsContext extends BaseConfigContext<ForgeSettings> {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected configSvc: SingletonService) {
		super(configSvc);
	}

	//	API Methods

	//	Helpers
	protected loadConfigKey() {
		return `ForgeSettings-${this.AppID}`;
	}

	protected loadDefaultConfig(): ForgeSettings {
		return { Platforms: [{ Details: {}, Lookup: "", Name: "" }], Theme: { Details: {}, Style: "" } };
	}
}
