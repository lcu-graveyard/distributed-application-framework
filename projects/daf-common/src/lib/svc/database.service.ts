import { DatabaseConfiguration, DataSetConfiguration, EventsConfiguration, ForgeSettings } from '@lcu/apps';
import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { PageElement, PointersConfig, PageSettings } from '@lcu/elements';
import { WorkerService } from './worker.service';
import { DAFService } from '@lcu/api';
import { BaseModeledResponse, BaseResponse } from '@lcu/core';

@Injectable({
	providedIn: 'root',
})
export class DatabaseService extends DAFService {
	//	Fields
	protected dbConfig: DatabaseConfiguration;

	protected rootPath: string;

	//	Properties

	//	Constructors
	constructor(protected injector: Injector, protected workerSvc: WorkerService) {
		super(injector);

		this.rootPath = '/forge-api/data-flow';
	}

	//	API Methods
	public BuildDatabase(db: string | DatabaseConfiguration): any {
		this.dbConfig = typeof(db) === 'string' ? <DatabaseConfiguration>{ DBName: db, AutoSave: true } : <DatabaseConfiguration>db;

		// var loki = new Loki(this.dbConfig.DBName);

		// loki.autosave = this.dbConfig.AutoSave;

		// return loki;
		return {};
	}

	public InitializeOnWorker() {
		var blobUrl = this.workerSvc.CreateWorkerBlob([
			`(${this.BuildDatabase})()`
		]);

		
	}

	public LoadCSS(pageElements: { Elements: PageElement[], PointersConfig: PointersConfig, ForgeSettings: ForgeSettings, PageSettings: PageSettings }, appId: string, path: string): Observable<BaseModeledResponse<string>> {
		return this.post(pageElements, `${this.rootPath}/app-page-data/${appId}/css?pagePath=${encodeURIComponent(path)}`);
	}

	public LoadDBConfig(appId: string, path: string): Observable<BaseModeledResponse<DatabaseConfiguration>> {
		return this.get(`${this.rootPath}/app-page-data/${appId}/config?pagePath=${encodeURIComponent(path)}`);
	}

	public LoadEventsConfig(appId: string, path: string): Observable<BaseModeledResponse<EventsConfiguration>> {
		return this.get(`${this.rootPath}/app-page-data/${appId}/events?pagePath=${encodeURIComponent(path)}`);
	}

	public SaveDBConfig(dbConfig: DatabaseConfiguration, appId: string, path: string): Observable<BaseResponse> {
		return this.post(dbConfig, `${this.rootPath}/app-page-data/${appId}/config?pagePath=${encodeURIComponent(path)}`);
	}

	public SaveEventsConfig(eventsConfig: EventsConfiguration, appId: string, path: string): Observable<BaseResponse> {
		return this.post(eventsConfig, `${this.rootPath}/app-page-data/${appId}/events?pagePath=${encodeURIComponent(path)}`);
	}

	public SyncDB(dsConfig: DataSetConfiguration, changes: any[], appId: string, path: string): Observable<BaseModeledResponse<any[]>> {
		return this.post({ DSConfig: dsConfig, Changes: changes }, `${this.rootPath}/app-page-data/${appId}/sync?pagePath=${encodeURIComponent(path)}`);
	}
}
