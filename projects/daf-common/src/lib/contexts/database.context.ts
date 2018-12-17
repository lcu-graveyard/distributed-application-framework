import { Injectable, Inject } from '@angular/core';
import { Status } from '@lcu/common';
import { BaseModeledResponse } from '@lcu/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../svc/database.service';
import { DatabaseConfiguration, DataSetConfiguration } from '@lcu/apps';

export class DatabaseContext {
	//	Fields
	protected applyingChanges: BehaviorSubject<boolean>;

	protected configured: BehaviorSubject<boolean>;

	protected error: BehaviorSubject<Status>;

	protected hasChanges: BehaviorSubject<boolean>;

	protected loading: BehaviorSubject<boolean>;

	protected loki: any;

	protected winAny: any;

	//	Properties
	public get AppID(): string {
		return this.winAny.ViewBag.ApplicationID;
	}

	public ApplyingChanges: Observable<boolean>;

	public get BasePath(): string {
		return document.getElementsByTagName('base')[0].href;
	}

	public Configured: Observable<boolean>;

	public get CurrentPath(): string {
        var path = window.location.href.replace(this.BasePath, '');

        path = path.replace(location.search, '');

		return `/${path}`;
	}

	public Error: Observable<Status>;

	public HasChanges: Observable<boolean>;

	public Loading: Observable<boolean>;

	//	Constructors
	constructor(public DBConfig: DatabaseConfiguration, protected dbSvc: DatabaseService) {
		this.applyingChanges = new BehaviorSubject(false);

		this.ApplyingChanges = this.applyingChanges.asObservable();

		this.configured = new BehaviorSubject(false);

		this.Configured = this.configured.asObservable();

		this.error = new BehaviorSubject(null);

		this.Error = this.error.asObservable();

		this.hasChanges = new BehaviorSubject(false);

		this.HasChanges = this.hasChanges.asObservable();

		this.loading = new BehaviorSubject(false);

		this.Loading = this.loading.asObservable();

		this.winAny = window;

		this.Load();
	}

	//	API Methods
	public GetCollection(dsConfig: DataSetConfiguration) {
		var col = this.loki.getCollection(dsConfig.Type) || this.loki.addCollection(dsConfig.Type, {
			autoupdate: true,
			disableChangesApi: false
		});

		//col.clear();

		return col;
	}

	public Load(dbConfig: DatabaseConfiguration = null) {
		this.loading.next(true);

		if (!dbConfig)
			dbConfig = this.DBConfig;
		else
			this.DBConfig = dbConfig;

		this.loki = this.dbSvc.BuildDatabase(this.DBConfig);

		//this.loki.loadDatabase();

		this.setupChangeHandling();

		this.loading.next(false);

		this.configured.next(true);
	}

	public LoadChanges(cols?: string[]) {
		return this.loki.generateChangesNotification(cols);
	}

	public Save() {
		//this.error.next(null);

		//this.loki.saveDatabase((err) => {
		//	this.error.next(<Status>{
		//		Code: 1,
		//		Message: err
		//	});
		//});
	}

	public Sync(dsConfig: DataSetConfiguration, elements: any[]): Observable<BaseModeledResponse<any[]>> {
		this.error.next(null);

		return this.dbSvc.SyncDB(dsConfig, elements, this.AppID, this.CurrentPath);
	}

	public WithLoki(action: (loki: any) => any) {
		return action(this.loki);
	}

	//	Helpers
	protected handleChanges() {
		//	TODO:  Manage sync of changes API
	}

	protected setupChangeHandling() {
		setInterval(() => {
			this.handleChanges();
		}, this.DBConfig.SyncSeconds);
	}
}
