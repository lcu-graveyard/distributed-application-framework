import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DevicesConfig } from '@lcu/apps';
import { ObservableContextService } from '@lcu/api';
import { SingletonService } from '@lcu/enterprises';
import { isResultSuccess } from '@lcu/core';

export const DEVICES_CONFIG_TYPE: string = 'ForgeDevicesConfig';

@Injectable({
	providedIn: 'root'
})
export class DevicesConfigContext extends ObservableContextService<DevicesConfig> {
	//	Fields
	protected loading: BehaviorSubject<boolean>;

	//	Properties
	public Config: DevicesConfig;

	public Loading: Observable<boolean>;

	//	Constructors
	constructor(protected singletonSvc: SingletonService) {
		super();

		this.loading = new BehaviorSubject(false);

		this.Loading = this.loading.asObservable();

		this.Load();
	}

	//	API Methods
	public Load() {
		this.loading.next(true);

		this.singletonSvc.Get(DEVICES_CONFIG_TYPE).subscribe(
			(result) => {
				if (isResultSuccess(result)) {
					this.Config = result.Model;

					this.subject.next(this.Config);
				} else if (result.Status.Code == 2) {
					this.Config = this.defaultValue();

					this.subject.next(this.Config);
				} else {
					this.subject.error(result.Status);
				}
			},
			(err) => this.subject.error(err),
			() => {
				this.loading.next(false);
			});
	}

	public Save(config: DevicesConfig) {
		this.loading.next(true);

		this.singletonSvc.Save(DEVICES_CONFIG_TYPE, config).subscribe(
			(result) => {
				if (isResultSuccess(result)) {
					this.Load();
				} else {
					this.subject.error(result.Status);

					this.loading.next(false);
				}
			},
			(err) => {
				this.subject.error(err);

				this.loading.next(false);
			});
	}

	//	Helpers
	protected defaultValue(): DevicesConfig {
		return {
			DeviceTypes: []
		};
	}
}
