import { Status, Guid } from '@lcu/common';
import { isResultSuccess } from '@lcu/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DatabaseService } from '../svc/database.service';
import { DataSetConfiguration } from '@lcu/apps';

export class DataFlowContext<T> {
	//	Fields
	protected changes: any[];

	protected data: BehaviorSubject<T[]>;

	protected dataCol: T[];

	protected error: BehaviorSubject<Status>;

	protected loading: BehaviorSubject<boolean>;

	protected winAny: any;

	//	Properties
	public get AppID(): string {
		return this.winAny.ViewBag.ApplicationID;
	}

	public get BasePath(): string {
		return document.getElementsByTagName('base')[0].href;
	}

	public get CurrentPath(): string {
		var path = window.location.href.replace(this.BasePath, '');

        path = path.replace(location.search, '');

		return `/${path}`;
	}

	public Data: Observable<T[]>;

	public Error: Observable<Status>;

	public Loading: Observable<boolean>;

	//	Constructors
	constructor(public DSConfig: DataSetConfiguration, protected dbSvc: DatabaseService) {
		this.changes = [];

		this.dataCol = [];

		this.data = new BehaviorSubject([]);

		this.Data = this.data.asObservable();

		this.error = new BehaviorSubject(null);

		this.Error = this.error.asObservable();

		this.loading = new BehaviorSubject(false);

		this.Loading = this.loading.asObservable();

		this.winAny = window;

		this.load();
	}

	//	API Methods
	public ClearChanges() {
		this.changes = [];
	}

	public Get(id: string): T {
		return this.dataCol.find(d => d['id'] == id || d['ID'] == id);
	}

	public Insert(docs: T | T[]) {
		var ds = this.ensureArray(docs);

		ds.forEach(
			(doc) => {
				this.dataCol.push(doc);

				this.addChange("I", doc);
			});

		this.data.next(this.dataCol);
	}

	public LoadChanges() {
		return this.changes;
	}

	public Remove(docs: T | T[]) {
		var ds = this.ensureArray(docs);

		var removed = ds.every(doc => {
			if (doc) {
				var removeIndex = this.dataCol.indexOf(doc);

				if (removeIndex >= 0) {
					this.dataCol.splice(removeIndex, 1);

					this.addChange("R", doc);
				}
			}

			return true;
		});

		this.data.next(this.dataCol);

		return removed;
	}

	public Reconfigure(dsConfig: DataSetConfiguration) {
		this.DSConfig = dsConfig;

		this.load();
	}

	public Reset(docs: T[]) {
		this.dataCol = [];

		this.dataCol.push(...docs);

		this.ClearChanges();

		this.data.next(this.dataCol);
	}

	public Sync(): Observable<Status> {
		return new Observable(obs => {
			this.loading.next(true);

			this.error.next(null);

			this.dbSvc.SyncDB(this.DSConfig, this.LoadChanges(), this.AppID, this.CurrentPath).subscribe(
				(result) => {
					if (isResultSuccess(result)) {
						this.Reset(result.Model);
					} else {
						this.error.next(result.Status);

						this.loading.next(false);
					}
				},
				(err) => {
				},
				() => {
					this.loading.next(false);

					obs.next(<Status>{ Code: 0, Message: 'Success' });

					obs.complete();
				});
		});
	}

	public Update(docs: T | T[]) {
		var ds = this.ensureArray(docs);

		ds.forEach(
			(doc) => {
				var existing = this.Get(doc['ID']);

				var index = this.dataCol.indexOf(existing);

				if (index >= 0)
					this.dataCol.splice(index, 1, doc);

				this.addChange("U", doc);
			});

		this.data.next(this.dataCol);
	}

	public Save(docs: T | T[]) {
		var ds = this.ensureArray(docs);

		var inserts = ds.filter(doc => !doc['ID'] || doc['ID'] == Guid.Empty);

		var updates = ds.filter(doc => doc['ID'] && doc['ID'] != Guid.Empty);

		this.Insert(inserts);

		this.Update(updates);
	}

	//	Helpers
	protected addChange(op: 'I' | 'R' | 'U', asset: T) {
		this.changes.push({
			name: '',
			obj: asset,
			operation: op
		});
	}

	protected ensureArray(docs: T | T[]): T[] {
		if (!Array.isArray(docs)) {
			docs = [<T>docs];
		} 

		return <T[]>docs;
	}

	protected load() {
		this.Sync().subscribe();
	}
}
