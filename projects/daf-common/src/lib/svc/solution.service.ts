import { Injectable, Inject, Injector } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Status } from '@lcu/common';
import { isResultSuccess } from '@lcu/core';
import { DAFService } from '@lcu/api';
import { SingletonService } from '@lcu/enterprises';
import { SolutionElement } from '@lcu/elements';

@Injectable({
	providedIn: 'root'
})
export class ForgeSolutionService extends DAFService {
	//	Fields
	protected error: BehaviorSubject<Status>;

	protected loaded: BehaviorSubject<boolean>;

	protected loadedSolutionCheck: string;

	protected loading: BehaviorSubject<boolean>;

	protected winAny: any;

	//	Properties
	public Error: Observable<Status>;

	public get HasChanges(): boolean {
		return this.loadedSolutionCheck != JSON.stringify(this.Solution);
	}

	public Loaded: Observable<boolean>;

	public Loading: Observable<boolean>;

	public Lookup: string;

	public Solution: SolutionElement;

	//	Constructors
	constructor(protected injector: Injector, protected router: Router, protected configSvc: SingletonService,
		protected route: ActivatedRoute) {
		super(injector);

		this.error = new BehaviorSubject(<Status>{ Code: -1, Message: 'Initialized' });

		this.Error = this.error.asObservable();

		this.loaded = new BehaviorSubject(false);

		this.Loaded = this.loaded.asObservable();

		this.loading = new BehaviorSubject(false);

		this.Loading = this.loading.asObservable();

		this.winAny = window;
	}

	//	API Methods
	public RefreshSettings(lookup: string): Observable<Status> {
		this.Lookup = lookup;

		return new Observable(obs => {
			this.loading.next(true);

			this.error.next(<Status>{ Code: -1, Message: 'Initialized' });

			this.configSvc.Get(`SolutionElement-${this.Lookup}`).subscribe(
				(result) => {
					if (isResultSuccess(result)) {
						this.Solution = result.Model;
					} else if (result.Status.Code == 2) {
						this.Solution = <SolutionElement>{};
					} else {
						this.error.next(result.Status);
					}

					if (this.Solution) {
						this.loadedSolutionCheck = JSON.stringify(this.Solution);

						this.loading.next(false);

						this.loaded.next(true);

						obs.next(<Status>{
							Code: 0,
							Message: 'Success'
						});

						obs.complete();
					}
				});
		});
	}

	public Save(): Observable<Status> {
		return new Observable(obs => {
			this.loading.next(true);

			this.error.next(<Status>{ Code: -1, Message: 'Initialized' });

			this.configSvc.Save(`SolutionElement-${this.Lookup}`, this.Solution).subscribe(
				(result) => {
					if (isResultSuccess(result)) {
						this.loading.next(false);

						obs.next(result.Status);

						obs.complete();
					} else {
						this.loading.next(false);

						this.error.next(result.Status);

						obs.next(<Status>{ Code: 0, Message: 'Success' });

						obs.complete();
					}
				},
				(err) => {
					this.loading.next(false);

					obs.next(<Status>{ Code: 0, Message: 'Success' });

					obs.complete();
				});
		});
	}

	//	Helpers
}
