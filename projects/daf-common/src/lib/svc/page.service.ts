import { Injectable, Inject, EventEmitter, Injector } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from './database.service';
import { DataFlowContext } from '../contexts/data-flow.context';
import { PageSettingsContext } from '../contexts/page-settings.context';
import { PointersConfigContext } from '../contexts/pointers-config.context';
import { ForgeSettingsContext } from '../contexts/forge-settings.context';
import { Status } from '@lcu/common';
import { BaseModeledResponse, isResultSuccess } from '@lcu/core';
import { DAFService } from '@lcu/api';
import { ForgeSettings, DataSetQuery, DatabaseConfiguration } from '@lcu/apps';
import { PageElement, PointersConfig, PageSettings } from '@lcu/elements';

@Injectable({
	providedIn: 'root'
})
export class ForgePageService extends DAFService {
	//	Fields
	protected get appId(): string {
		return this.winAny.ViewBag.ApplicationID;
	}

	protected cssPath: BehaviorSubject<string>;

	protected elsCtxt: DataFlowContext<PageElement>;

	protected elsCtxtLoading: Subscription;

	protected error: BehaviorSubject<Status>;

	protected events: { [key: string]: BehaviorSubject<BaseModeledResponse<any>> };

	protected loaded: BehaviorSubject<boolean>;

	protected loadedElementsCheck: string;

	protected loadedSettingsCheck: string;

	protected loading: BehaviorSubject<boolean>;

	protected winAny: any;

	//	Properties
	public CSSPath: Observable<string>;

	public Data: { [key: string]: DataFlowContext<any> };

	public DataChange: EventEmitter<Status>;

	public Elements: PageElement[];

	public Error: Observable<Status>;

	public Events: { [key: string]: Observable<BaseModeledResponse<any>> };

	public ForgeSettings: ForgeSettings;

	public get HasChanges(): boolean {
		return this.loadedElementsCheck != JSON.stringify(this.Elements) ||
			this.loadedSettingsCheck != JSON.stringify(this.Settings);
	}

	public Loaded: Observable<boolean>;

	public Loading: Observable<boolean>;

	public Lookup: string;

	public get NextOrder(): number {
		if (!this.Elements || this.Elements.length == 0)
			return 0;

		return this.Elements.reduce((prev, curr) => {
			return prev.Order > curr.Order ? prev : curr;
		}).Order;
	}

	public PointersConfig: PointersConfig;

	public Settings: PageSettings;

	//	Constructors
	constructor(protected injector: Injector, protected router: Router, protected pageSettings: PageSettingsContext,
		protected dbSvc: DatabaseService, protected route: ActivatedRoute, protected pointersConfig: PointersConfigContext,
		protected forgeSettings: ForgeSettingsContext) {
		super(injector);

		this.cssPath = new BehaviorSubject(null);

		this.CSSPath = this.cssPath.asObservable();

		this.DataChange = new EventEmitter();

		this.error = new BehaviorSubject(<Status>{ Code: -1, Message: 'Initialized' });

		this.Error = this.error.asObservable();

		this.loaded = new BehaviorSubject(false);

		this.Loaded = this.loaded.asObservable();

		this.loading = new BehaviorSubject(false);

		this.Loading = this.loading.asObservable();

		this.winAny = window;

		this.forgeSettings.Context.subscribe(settings => {
			this.ForgeSettings = settings;

			this.LoadPageCSS(this.Elements);
		});

		this.forgeSettings.Loading.subscribe(loading => {
			this.loading.next(loading);
		});

		this.pageSettings.Context.subscribe(settings => {
			this.Settings = settings;

			if (this.Settings) {
				this.loadedSettingsCheck = JSON.stringify(this.Settings);
			}

			this.LoadPageCSS(this.Elements);
		});

		this.pageSettings.Loading.subscribe(loading => {
			this.loading.next(loading);
		});

		this.pointersConfig.Context.subscribe(pointersConfig => {
			this.PointersConfig = pointersConfig;

			this.LoadPageCSS(this.Elements);
		});

		this.pointersConfig.Loading.subscribe(loading => {
			this.loading.next(loading);
		});
	}

	//	API Methods
	public AddPageElement(pe?: PageElement) {
		pe = pe || <PageElement>{
			//ColumnSpan: 1,
			Order: 500000,
			//RowSpan: 1,
			Title: 'New Tile',
			PageLookup: this.Lookup
		};

		this.elsCtxt.Insert([pe]);

		this.elsCtxt.Sync().subscribe();
		//this.Save().subscribe();
	}

	public FireEvent(eventName: string, response: BaseModeledResponse<any>) {
		if (this.Events && this.Events[eventName])
			this.events[eventName].next(response);
	}

	public LoadPageCSS(els: PageElement[]): Observable<Status> {
		return new Observable(obs => {
			if (els && els.length > 0) {//} && !!this.PointersConfig && !!this.Settings && !!this.ForgeSettings) {
				this.loading.next(true);

				this.dbSvc.LoadCSS({
					Elements: els,
					PointersConfig: this.PointersConfig,
					ForgeSettings: this.ForgeSettings,
					PageSettings: this.Settings
				}, this.appId, this.Lookup).subscribe(
					(result) => {
						if (isResultSuccess(result)) {
							var file = new Blob([result.Model], { type: 'text/css' });

							this.cssPath.next(URL.createObjectURL(file));

							obs.next(<Status>{
								Code: 0,
								Message: 'Success'
							});

							obs.complete();
						} else {
							obs.error(result.Status);

							obs.complete();
						}
					},
					(err) => {
					},
					() => {
						this.loading.next(false);
					});
			}
		});
	}

	public LoadPageData(): Observable<Status> {
		return new Observable(obs => {
			this.dbSvc.LoadDBConfig(this.appId, this.Lookup).subscribe(
				(result) => {
					if (isResultSuccess(result)) {
						this.Data = {};

						if (result.Model && result.Model.DataSets) {
							for (var dsKey in result.Model.DataSets) {
								if (!this.Data[dsKey])
									this.Data[dsKey] = this.buildDataFlowContext(result.Model, dsKey);
								else
									this.Data[dsKey].Reconfigure(result.Model.DataSets[dsKey]);
							}
						}

						var status = <Status>{
							Code: 0,
							Message: 'Success'
						};
						
						this.DataChange.emit(status);
						
						obs.next(status);

						obs.complete();
					} else {
						obs.error(result.Status);

						obs.complete();
					}
				});
		});
	}

	public LoadPageEvents(): Observable<Status> {
		return new Observable(obs => {
			this.dbSvc.LoadEventsConfig(this.appId, this.Lookup).subscribe(
				(result) => {
					if (isResultSuccess(result)) {
						this.events = {};

						this.Events = {};

						if (result.Model && result.Model.Events) {
							for (var eventKey in result.Model.Events) {
								this.events[eventKey] = new BehaviorSubject(<BaseModeledResponse<any>>{ Status: <Status>{ Code: -1, Message: 'Initialized' } });

								this.Events[eventKey] = this.events[eventKey].asObservable();
							}
						}

						obs.next(<Status>{
							Code: 0,
							Message: 'Success'
						});

						obs.complete();
					} else {
						obs.error(result.Status);

						obs.complete();
					}
				});
		});
	}

	public RefreshSettings(lookup: string): Observable<Status> {
		this.Lookup = lookup;

		return new Observable(obs => {
			this.loading.next(true);

			this.error.next(<Status>{ Code: -1, Message: 'Initialized' });

			var lookup = this.Lookup.replace('/', '-');

			this.elsCtxt = new DataFlowContext({
				Query: <DataSetQuery>{
					Where: `d.PageLookup = '${this.Lookup}' `,//AND d.ApplicationID = '${this.appId}' `,
				},
				Sorting: {
					BasicSort: 'Order',
					IsDesc: false
				},
				Type: `PageElement-${this.appId}`
			}, this.dbSvc);

			if (this.elsCtxtLoading)
				this.elsCtxtLoading.unsubscribe();

			this.elsCtxtLoading = this.elsCtxt.Loading.subscribe(loading => this.loading.next(loading));

			this.elsCtxt.Data.subscribe(els => {
				if (els && els.length > 0)
					this.LoadPageCSS(els).subscribe(() => {
						this.Elements = els;

						this.Elements.forEach(el => el.PageSave = true);

						this.Elements = this.Elements.sort((el1, el2) => {
							return el1.Order < el2.Order ? -1 : el1.Order > el2.Order ? 1 : 0;
						});

						if (!this.Elements || this.Elements.length == 0)
							this.loadedElementsCheck = JSON.stringify(this.Elements);

						this.loaded.next(true);
					});
				else
					this.Elements = [];
			});

			forkJoin(
				this.LoadPageData(),
				//this.LoadPageEvents()
			).subscribe(
				(results) => {
					this.loading.next(false);

					this.loaded.next(true);

					obs.next(<Status>{
						Code: 0,
						Message: 'Success'
					});

					obs.complete();

					//	TODO: Emit event of page data load error for display and output
				});
		});
	}

	public RemovePageElement(pe: PageElement) {
		return this.elsCtxt.Remove([pe]);
	}

	public UpdatePageElement(pe: PageElement | PageElement[]) {
		if (!Array.isArray(pe))
			pe = [<PageElement>pe];

		return this.elsCtxt.Save(<PageElement[]>pe);
	}

	public Save(): Observable<Status> {
		return new Observable(obs => {
			this.loading.next(true);

			this.error.next(<Status>{ Code: -1, Message: 'Initialized' });

			var lookup = this.Lookup.replace('/', '-');

			this.Elements.forEach((pe, i) => {
				pe.Order = 500 * i;

				//pe.ApplicationID = this.appId;
			});

			this.UpdatePageElement(this.Elements);

			forkJoin(
				this.elsCtxt.Sync(),
				this.pageSettings.Save(this.Settings)
			).subscribe(
				(results) => {
					this.loading.next(false);

					obs.next(results[0]);

					obs.complete();
				});
		});
	}

	public SavePointersConfig(): Observable<Status> {
		return new Observable(obs => {
			this.pointersConfig.Save(this.PointersConfig).subscribe(status => {
				obs.next(status);

				obs.complete();
			});
		});
	}

	//	Helpers
	protected buildDataFlowContext(dbConfig: DatabaseConfiguration, dsKey: string): DataFlowContext<any> {
		if (dbConfig && dsKey) {
			//new DataFlowContext({
			//	Query: <DataSetQuery>{
			//		Where: `d.PageLookup = '${this.Lookup}' `,
			//	},
			//	Sorting: {
			//		BasicSort: 'Order',
			//		IsDesc: false
			//	},
			//	Type: `PageElement`
			//}, this.dbSvc);
			var dsConfig = dbConfig.DataSets[dsKey];

			return new DataFlowContext(dsConfig, this.dbSvc);
		} else
			return null;
	}

}
