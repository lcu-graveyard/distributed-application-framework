import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { DAFService } from '@lcu/api';
import { DomainService } from '@lcu/enterprises';
import { BaseResponse, BaseModeledResponse } from '@lcu/core';
import { Pageable } from '@lcu/common';
import { ApplicationModel } from '@lcu/apps';

@Injectable({
	providedIn: 'root'
})
export class ForgeApplicationsService extends DAFService {
	//	Properties
	protected rootUrl: string = '/forge-api/apps';

	//	Constructors
	constructor(protected injector: Injector, protected domainSvc: DomainService) {
		super(injector);
	}

	//	API Methods
	public Delete(appId: string): Observable<BaseResponse> {
		return this.delete(`${this.rootUrl}/${appId}`);
	}

	public ListApps(host: string, page: number, pageSize: number): Observable<BaseModeledResponse<Pageable<ApplicationModel>>> {
		return this.get(`${this.rootUrl}/list/${page}/${pageSize}?host=${host}`);
	}

	public ListFabricApplicationServices(): Observable<BaseModeledResponse<{ ApplicationName: string, ServiceNames: string[] }>> {
		return this.get(`${this.rootUrl}/fabric/app/services`);
	}

	public ListHosts(): Observable<BaseModeledResponse<string[]>> {
		return this.get(`${this.rootUrl}/hosts`);
	}

	public Save(app: ApplicationModel): Observable<BaseModeledResponse<ApplicationModel>> {
		return this.post(app, `${this.rootUrl}`);
	}

	public SaveAll(apps: ApplicationModel[]): Observable<BaseResponse> {
		return this.post(apps, `${this.rootUrl}/save-all`);
	}

	public SetAppBuilder(builder: boolean): Observable<BaseResponse> {
		return this.post({ Builder: builder }, `${this.rootUrl}/app-builder`);
	}
}
