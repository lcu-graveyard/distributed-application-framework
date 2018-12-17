import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationModel } from '@lcu/apps';
import { BaseResponse, BaseModeledResponse } from '@lcu/core';
import { Pageable } from '@lcu/common';
import { DAFService } from '@lcu/api';
import { Headers, RequestOptions } from '@angular/http';

@Injectable({
	providedIn: 'root'
})
export class ForgeOrganizationService extends DAFService {
	//	Properties
	protected rootUrl: string = '/forge-api/org';

	//	Constructors
	constructor(protected injector: Injector) {
		super(injector);
	}

	//	API Methods
	//public AppPageLookup(appId: string, path: string): Observable<BaseModeledResponse<Page>> {
	//	return this.get(`${this.rootUrl}/app-page-lookup/${appId}?pagePath=${encodeURIComponent(path)}`).pipe(
	//		this.map<BaseModeledResponse<Page>>(),
	//		this.catchError()
	//	);
	//}

	public Configure(host: string): Observable<BaseResponse> {
		return this.post({
			Host: host
		}, `${this.rootUrl}/configure`);
	}

	public Get(): Observable<BaseModeledResponse<OrganizationModel>> {
		return this.get(`${this.rootUrl}`);
	}

	public List(page: number, pageSize: number): Observable<BaseModeledResponse<Pageable<OrganizationModel>>> {
		return this.get(`${this.rootUrl}/list/${page}/${pageSize}`);
	}

	public ListFabricApplicationServices(): Observable<BaseModeledResponse<{ ApplicationName: string, ServiceNames: string[] }>> {
		return this.get(`${this.rootUrl}/fabric/app/services`);
	}

	public ListHosts(): Observable<BaseModeledResponse<string[]>> {
		return this.get(`${this.rootUrl}/hosts`);
	}

	public LoadAppPageCSS(appId: string, path: string): Observable<BaseModeledResponse<string>> {
		return this.get(`${this.rootUrl}/app-page-css/${appId}?pagePath=${encodeURIComponent(path)}`);
	}

	public RefreshApps(): Observable<BaseResponse> {
		return this.get(`${this.rootUrl}/refresh-apps`);
	}

	public Save(org: OrganizationModel): Observable<BaseModeledResponse<OrganizationModel>> {
		return this.post(org, `${this.rootUrl}`);
	}

	public SetAppBuilder(builder: boolean): Observable<BaseResponse> {
		return this.post({ Builder: builder }, `${this.rootUrl}/app-builder`);
	}

	public SetHasApps(): Observable<BaseResponse> {
		return this.post({}, `${this.rootUrl}/has-apps`);
	}

	public Secure(lookup: string, orgId: string): Observable<BaseResponse> {
		return this.get(`${this.rootUrl}/secure/${lookup}?orgId=${orgId}`);
	}

	public SecureHost(host: string): Observable<BaseResponse> {
		return this.post({ Host: host }, `${this.rootUrl}/secure/host`);
	}

	public UploadApplicationPackage(file: File, appId: string, filesPath: string) {
		const formData: FormData = new FormData();
		formData.append('fileKey', file, file.name);

		var headers = new Headers({
			//'Content-Type': 'multipart/form-data',
			'appId': appId,
			'filesPath': filesPath
		});

		var options = new RequestOptions({ headers: headers });

		return this.http.post(`${this.rootUrl}/app-package`, formData, options).pipe(
			this.map<BaseResponse>(),
			this.catchError()
		);
	}
}
