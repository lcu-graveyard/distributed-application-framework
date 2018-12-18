import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Status } from '@lcu/common';
import { BaseModeledResponse } from '@lcu/core';
import { PageElement } from '@lcu/elements';
import { DataFlowContext, ForgePageService } from '@lcu/daf-common';

export class ControlBuilderDialogConfig {
	public Context: any;

	public Element: PageElement;
}

@Component({
	selector: 'control-builder-dialog',
	templateUrl: './control-builder.dialog.html',
	styleUrls: ['./control-builder.dialog.scss']
})
export class ControlBuilderDialog implements OnInit {
	//	Fields

	//	Properties
	public Context: any;

	public Element: PageElement;

	public get Data(): { [key: string]: DataFlowContext<any> } {
		return this.pgSvc.Data || {};
	}

	//	Constructors
	constructor(protected dialogRef: MatDialogRef<ControlBuilderDialog>, @Inject(MAT_DIALOG_DATA) config: ControlBuilderDialogConfig,
		protected pgSvc: ForgePageService) {
		this.Context = config.Context;

		this.Element = JSON.parse(JSON.stringify(config.Element));
	}

	//	Life Cycle
	public ngOnInit() {
	}

	//	API Methods
	public Cancel() {
		this.dialogRef.close(<BaseModeledResponse<PageElement>>{
			Model: null,
			Status: <Status>{
				Code: 1,
				Message: 'Cancelled'
			}
		});
	}

	public Save() {
		this.dialogRef.close(<BaseModeledResponse<PageElement>>{
			Model: this.Element,
			Status: <Status>{
				Code: 0,
				Message: 'Success'
			}
		});
	}
}
