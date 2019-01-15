import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginProviderConfig } from '@lcu/apps';
import { DAFService } from '@lcu/api';
import { BaseResponse, BaseModeledResponse } from '@lcu/core';

@Injectable({
	providedIn: 'root'
})
export class LoginProviderService extends DAFService {
	//	Fields
	protected rootUrl: string = '/forge-api/login-provider';

	//	Constructors
	constructor(protected injector: Injector) {
		super(injector);
	}

	//	API Methods

}
