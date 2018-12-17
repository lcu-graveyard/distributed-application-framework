import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ProvisioningConfig } from '@lcu/apps';
import { DAFService } from '@lcu/api';
import { BaseResponse, BaseModeledResponse } from '@lcu/core';

@Injectable({
	providedIn: 'root'
})
export class ProvisioningService extends DAFService {
	//	Fields
	protected rootUrl: string = '/forge-api/provisioning';

	//	Constructors
	constructor(protected injector: Injector) {
		super(injector);
	}

	//	API Methods
	public Save(config: ProvisioningConfig): Observable<BaseResponse> {
		return this.post(config, `${this.rootUrl}`);
	}

	public Get(): Observable<BaseModeledResponse<ProvisioningConfig>> {
		return this.get(`${this.rootUrl}`);
	}
}
