import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { JSONSchemaMap } from '@lcu/apps';
import { DAFService } from '@lcu/api';
import { BaseResponse, BaseModeledResponse } from '@lcu/core';
import { Pageable } from '@lcu/common';

@Injectable({
	providedIn: 'root',
})
export class ForgeJSONSchemaService extends DAFService {
	//	Properties
	protected rootUrl: string;

	//	Constructors
	constructor(protected injector: Injector) {
		super(injector);

		this.rootUrl = '/forge-api/schema/json';
	}

	//	API Methods
	public Delete(id: string): Observable<BaseResponse> {
		return this.delete(`${this.rootUrl}/${id}`);
	}

	public Get(id: string): Observable<BaseModeledResponse<JSONSchemaMap>> {
		return this.get(`${this.rootUrl}/${id}`);
	}

	public List(page: number, pageSize: number): Observable<BaseModeledResponse<Pageable<JSONSchemaMap>>> {
		return this.get(`${this.rootUrl}/list/${page}/${pageSize}`);
	}

	public Save(schemaMap: JSONSchemaMap): Observable<BaseModeledResponse<JSONSchemaMap>> {
		return this.post(schemaMap, `${this.rootUrl}`);
	}

	//	Helpers
}
