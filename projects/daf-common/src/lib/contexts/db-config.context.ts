import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '@lcu/common';
import { isResultSuccess } from '@lcu/core';
import { BaseConfigContext, SingletonService } from '@lcu/enterprises';
import { DatabaseService } from '../svc/database.service';
import { ForgePageService } from '../svc/page.service';
import { DatabaseConfiguration } from '@lcu/apps';

@Injectable({
	providedIn: 'root'
})
export class DBConfigContext extends BaseConfigContext<DatabaseConfiguration> {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected configSvc: SingletonService, protected dbSvc: DatabaseService,
		protected pgSvc: ForgePageService) {
		super(configSvc, true);

		this.load();
	}

	//	API Methods
	public Load(): Observable<Status> {
		return new Observable(obs => {
			this.loading(true);

			this.error.next(null);

			this.dbSvc.LoadDBConfig(this.AppID, this.loadConfigKey()).subscribe(
				(result) => {
					if (isResultSuccess(result)) {
						this.subject.next(result.Model);

						obs.next(result.Status);
					} else if (result.Status.Code == 2) {
						this.subject.next(this.loadDefaultConfig());

						obs.next(<Status>{ Code: 0, Message: 'Success' });
					} else {
						this.error.next(result.Status);

						obs.next(result.Status);
					}
				},
				(err) => {
					this.error.next(err);

					obs.next(<Status>{ Code: 1, Message: err });
				},
				() => {
					this.loading(false);

					obs.complete();
				});
		});
	}

	public Save(config: DatabaseConfiguration): Observable<Status> {
		return new Observable(obs => {
			this.loading(true);

			this.error.next(null);

			this.dbSvc.SaveDBConfig(config, this.AppID, this.loadConfigKey()).subscribe(
				(result) => {
					if (isResultSuccess(result)) {
						this.load();
					} else {
						this.error.next(result.Status);

						this.loading(false);
					}

					obs.next(result.Status);
				},
				(err) => {
					this.error.next(err);

					this.loading(false);

					obs.next(<Status>{ Code: 1, Message: err });
				},
				() => {
					obs.complete();
				});
		});
	}

	//	Helpers
	protected loadConfigKey() {
		if (!this.pgSvc.Lookup)
			throw new Error('No lookup set yet...');

		return this.pgSvc.Lookup;
	}

	protected loadDefaultConfig(): DatabaseConfiguration {
		return <DatabaseConfiguration>{ DataSets: {} };
	}
}
