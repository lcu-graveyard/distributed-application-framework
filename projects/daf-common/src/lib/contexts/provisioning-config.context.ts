import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProvisioningConfig } from '@lcu/apps';
import { ProvisioningService } from './../svc/provisioning.service';
import { ObservableContextService } from '@lcu/api';
import { Status } from '@lcu/common';
import { isResultSuccess } from '@lcu/core';

@Injectable({
	providedIn: 'root'
})
export class ProvisioningConfigContext extends ObservableContextService<ProvisioningConfig> {
	//	Fields
	protected loading: BehaviorSubject<boolean>;

	//	Properties
	public Loading: Observable<boolean>;

	//	Constructors
	constructor(protected provSvc: ProvisioningService) { 
		super();

		this.loading = new BehaviorSubject(false);

		this.Loading = this.loading.asObservable();

		this.load();
	}

	//	API Methods
	public Load(): Observable<Status> {
		return new Observable(obs => {
			this.loading.next(true);

			this.provSvc.Get().subscribe(
				(result) => {
					if (isResultSuccess(result)) {
						this.subject.next(result.Model);

						obs.next(result.Status);
					} else if (result.Status.Code == 2) {
						this.subject.next(<ProvisioningConfig>{});

						obs.next(<Status>{ Code: 0, Message: 'Success' });
					} else {
						obs.next(result.Status);
					}
				},
				(err) => {
					obs.next(<Status>{ Code: 1, Message: err });
				},
				() => {
					this.loading.next(false);

					obs.complete();
				});
		});
	}

	public Save(config: ProvisioningConfig): Observable<Status> {
		return new Observable(obs => {
			this.loading.next(true);

			this.provSvc.Save(config).subscribe(
				(result) => {
					if (isResultSuccess(result)) {
						this.Load().subscribe();
					}

					obs.next(result.Status);
				},
				(err) => {
					obs.next(<Status>{ Code: 1, Message: err });
				},
				() => {
					this.loading.next(false);

					obs.complete();
				});
		});
	}

	//	Helpers
	protected load() {
		this.Load().subscribe();
	}
}
