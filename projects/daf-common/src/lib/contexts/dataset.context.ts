import { Status } from '@lcu/common';
import { isResultSuccess } from '@lcu/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DatabaseContext } from './database.context';
import { DataSetConfiguration } from '@lcu/apps';

export class DataSetContext {
	//	Fields
	protected data: BehaviorSubject<any[]>;

	protected error: BehaviorSubject<Status>;

	protected loading: BehaviorSubject<boolean>;

	//	Properties
	public Data: Observable<any[]>;

	public get DSConfig(): DataSetConfiguration {
		return this.dbCtxt.DBConfig.DataSets[this.dsConfigKey];
	}

	public Error: Observable<Status>;

	public Loading: Observable<boolean>;

	//	Constructors
	constructor(protected dsConfigKey: string, protected dbCtxt: DatabaseContext) {
		this.data = new BehaviorSubject([]);

		this.Data = this.data.asObservable();

		this.error = new BehaviorSubject(null);

		this.Error = this.error.asObservable();

		this.loading = new BehaviorSubject(false);

		this.Loading = this.loading.asObservable();

		this.load();
	}

	//	API Methods
	public ClearChanges() {
		this.WithCollection((col) => {
			col.flushChanges();
		});
	}

	public Get(id: number) {
		return this.WithCollection((col) => {
			return col.get(id);
		});
	}

	// public Find<E>(query?: LokiQuery<E & LokiObj>) {
	// 	return this.WithCollection((col) => {
	// 		return col.find(query);
	// 	});
	// }

	public Insert(doc: any | any[]) {
		return this.WithCollection((col) => {
			return col.insert(doc);
		});
	}

	public LoadChanges() {
		return this.WithCollection((col) => {
			var changes = this.dbCtxt.LoadChanges([col.name]);

			changes.forEach(change => {
				delete change.obj.$loki;
			});

			return changes;
		});
	}

	public Remove(doc: any | any[] | number[]) {
		return this.WithCollection((col) => {
			return col.remove(doc);
		});
	}

	public Reset(doc: any[]) {
		this.WithCollection((col) => {
			col.clear();

			this.Insert(doc);

			this.ClearChanges();
		});
	}

	public Sync(): Observable<Status> {
		return new Observable(obs => {
			this.loading.next(true);

			this.error.next(null);

			this.dbCtxt.Sync(this.DSConfig, this.LoadChanges()).subscribe(
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

	public Update(doc: any | any[]) {
		return this.WithCollection((col) => {
			return col.update(doc);
		});
	}

	public Save(docs: any | any[]) {
		if (!Array.isArray(docs))
			docs = [docs];

		docs.forEach((doc) => {
			if (!doc['$loki']) {
				//	TODO:	Should we further check that if it isn't being tracked, it's ID isn't in the collection?  And if it is, call add instead of insert?
				this.Insert(doc);
			} else {
				this.Update(doc);
			}
		});
	}

	public WithCollection(action: (col: any) => any) {
		var col = this.dbCtxt.GetCollection(this.DSConfig);

		var res = action(col);

		var data = !this.DSConfig.Sorting ? col.data :
			col.chain().simplesort(this.DSConfig.Sorting.BasicSort, this.DSConfig.Sorting.IsDesc).data();

		this.data.next(data);

		this.dbCtxt.Save();

		return res;
	}

	//	Helpers
	protected initCollection(): any {
		var col = this.dbCtxt.GetCollection(this.DSConfig);

		this.data.next(col.data);

		this.Sync().subscribe();

		return col;
	}

	protected load() {
		this.initCollection();
	}
}
