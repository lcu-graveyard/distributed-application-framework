import { SingletonService, BaseConfigContext } from '@lcu/enterprises';
import { DeviceTypeConfig } from '@lcu/apps';

export class DeviceTypeContext extends BaseConfigContext<DeviceTypeConfig> {
	//	Fields
	protected deviceType: string;

	//	Properties

	//	Constructors
	constructor(deviceType: string, protected configSvc: SingletonService) {
		super(configSvc, true);

		this.deviceType = deviceType;

		this.load();
	}

	//	API Methods

	//	Helpers
	protected loadConfigKey() {
		return `ForgeDeviceTypeConfig-${this.deviceType}`;
	}

	protected loadDefaultConfig(): DeviceTypeConfig {
		return <DeviceTypeConfig>{ DefaultRefreshRate: 15, QAQCColumnsToDisplay: [], DeviceType: this.deviceType };
	}
}
