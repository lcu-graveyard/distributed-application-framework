import { Injectable, Inject } from '@angular/core';
import { BaseConfigContext, SingletonService } from '@lcu/enterprises';
import { PageSettings } from '@lcu/elements';

@Injectable({
	providedIn: 'root'
})
export class PageSettingsContext extends BaseConfigContext<PageSettings> {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected configSvc: SingletonService) {
		super(configSvc);
	}

	//	API Methods

	//	Helpers
	protected loadConfigKey() {
		return `PageSettings-${this.AppID}-${this.CurrentPath}`;
	}

	protected loadDefaultConfig(): PageSettings {
		return {
			Theme: {
				Style: '',
				Details: {}
			}
		};
	}
}
