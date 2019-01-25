import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessConfigModel, AccessRightModel, ClaimModel, OrganizationIdentityModel } from '@lcu/apps';
import { DAFService } from '@lcu/api';
import { BaseResponse, BaseModeledResponse } from '@lcu/core';
import { Pageable } from '@lcu/common';

@Injectable({
	providedIn: 'root'
})
export class ForgeOrganizationIdentityService extends DAFService {
	//	Properties
	protected rootUrl: string = '/forge-api/identity';

	//	Constructors
	constructor(protected injector: Injector) {
		super(injector);
	}

	//	API Methods
	public DeleteClaim(username: string, claimType: string): Observable<BaseResponse> {
		return this.delete(`${this.rootUrl}/users/${username}/claims/${encodeURIComponent(claimType)}`);
	}

	public DeleteProvider(type: string): Observable<BaseResponse> {
		return this.delete(`${this.rootUrl}/providers/${type}`);
	}

	public ListAccessConfigs(page: number, pageSize: number): Observable<BaseModeledResponse<Pageable<AccessConfigModel>>> {
		return this.get(`${this.rootUrl}/access-configs/list/${page}/${pageSize}`);
	}

	public ListAccessRights(page: number, pageSize: number): Observable<BaseModeledResponse<Pageable<AccessRightModel>>> {
		return this.get(`${this.rootUrl}/access-rights/list/${page}/${pageSize}`);
	}

	public ListClaims(username: string, page: number, pageSize: number): Observable<BaseModeledResponse<Pageable<ClaimModel>>> {
		return this.get(`${this.rootUrl}/users/${username}/claims/list/${page}/${pageSize}`);
	}

	public ListUsers(page: number, pageSize: number): Observable<BaseModeledResponse<Pageable<OrganizationIdentityModel>>> {
		return this.get(`${this.rootUrl}/users/list/${page}/${pageSize}`);
	}

	public SaveClaims(username: string, claims: ClaimModel[]): Observable<BaseResponse> {
		return this.post(claims, `${this.rootUrl}/users/${username}/claims`);
	}

	public SaveProvider(name: string, desc: string, type: string, metadata: any): Observable<BaseResponse> {
		var model = {
			Name: name,
			Description: desc,
			Type: type,
			...metadata
		};

		// model = Object.assign(model, metadata);

		return this.post(model, `${this.rootUrl}/providers`);
	}
}
