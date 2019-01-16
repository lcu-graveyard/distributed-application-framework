import { Injectable, Inject } from '@angular/core';
import { LoginProviderConfig, FacebookConfig} from '@lcu/apps';
import { BaseConfigContext, SingletonService } from '@lcu/enterprises';

@Injectable({
	providedIn: 'root'
})
export class LoginProviderConfigContext extends BaseConfigContext<LoginProviderConfig> {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected configSvc: SingletonService) {
		super(configSvc);
	}

	//	API Methods

	//	Helpers
	protected loadConfigKey() {
		return `ForgeLoginProviderConfig`;
	}

	protected loadDefaultConfig(): LoginProviderConfig {
        return {
            FacebookConfigs: {}          
        };
	}
}
