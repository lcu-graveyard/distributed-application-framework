import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class WorkerService {
	//	Fields

	//	Constructors
	constructor() {
	}

	//	API Methods
	public CreateWorkerBlob(blobParts: any[]): string {
		//var blob = new Blob(blobParts);

		//var blobURL = window.URL.createObjectURL(blob, <ObjectURLOptions>{
		//	type: 'application/javascript; charset=utf-8'
		//});

		//return blobURL;
		return '';
	}

	public CreateWorker(fileUrl: string): Worker {
		return new Worker(fileUrl);
	}
}
