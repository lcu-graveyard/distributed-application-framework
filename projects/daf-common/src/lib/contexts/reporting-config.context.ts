import { Injectable, Inject } from '@angular/core';
import { ReportingConfig } from '@lcu/apps';
import { BaseConfigContext, SingletonService } from '@lcu/enterprises';

@Injectable({
	providedIn: 'root'
})
export class ReportingConfigContext extends BaseConfigContext<ReportingConfig> {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected configSvc: SingletonService) {
		super(configSvc);
	}

	//	API Methods

	//	Helpers
	protected loadConfigKey() {
		return `ForgeReportingConfig`;
	}

	protected loadDefaultConfig(): ReportingConfig {
        return {
            PowerBIConfigs: {}
        };
	}
}
