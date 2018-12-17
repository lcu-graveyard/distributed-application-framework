import { Inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { DAFService } from '@lcu/api';
import { BaseModeledResponse } from '@lcu/core';

@Injectable({
	providedIn: 'root'
})
export class ReportingService extends DAFService {
	//    Fields
    protected handleNewReportUrl: string = 'new';

    protected listDashboardsUrl: string = 'dashboard/list';

    protected listDatasetsUrl: string = 'dataset/list';

	protected listReportsUrl: string = 'report/list';

	protected listTilesUrl: string = 'tile/list';

	protected loadDashboardConfigUrl: string = '/dashboard/config';

	protected loadReportConfigUrl: string = '/report/config';

    protected loadTileConfigUrl: string = '/tile/config';

	protected rootUrl: string;


	//    Constructors
	constructor(protected injector: Injector) {
		super(injector);

		this.rootUrl = '/forge-api/embed';
	}

	//    API Methods
    public HandleNewReport(datasetLookup: string): Observable<BaseModeledResponse<any>> {
        return this.get(`${this.rootUrl}/${this.handleNewReportUrl}?datasetLookup=${datasetLookup}`);
    }

	public ListDashboards(): Observable<BaseModeledResponse<{ [id: string]: string }>> {
		return this.get(`${this.rootUrl}/${this.listDashboardsUrl}`);
    }

    public ListDatasets(): Observable<BaseModeledResponse<{ [id: string]: string }>> {
        return this.get(`${this.rootUrl}/${this.listDatasetsUrl}`);
    }

	public ListReports(): Observable<BaseModeledResponse<{ [id: string]: string }>> {
		return this.get(`${this.rootUrl}/${this.listReportsUrl}`);
	}

	public ListTiles(dashboardLookup: string): Observable<BaseModeledResponse<{ [id: string]: string }>> {
		return this.get(`${this.rootUrl}/${this.listTilesUrl}?dashboardLookup=${dashboardLookup}`);
	}

	public LoadDashboardConfig(lookup: string): Observable<BaseModeledResponse<any>> {
		return this.get(`${this.rootUrl}/${this.loadDashboardConfigUrl}/${lookup}`);
	}

	public LoadReportConfig(lookup: string): Observable<BaseModeledResponse<any>> {
		return this.get(`${this.rootUrl}/${this.loadReportConfigUrl}/${lookup}`);
	}

	public LoadTileConfig(lookup: string, dashboardLookup: string): Observable<BaseModeledResponse<any>> {
		return this.get(`${this.rootUrl}/${this.loadTileConfigUrl}/${lookup}?dashboardLookup=${dashboardLookup}`);
	}

	//    Helpers
}