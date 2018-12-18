import { Component, EventEmitter, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RenderingControl, DisplayModuleSetup, DisplayModuleConfig, IBuildersService } from '@lcu/elements';
import { isResultSuccess, BaseModeledResponse } from '@lcu/core';
import { Status } from '@lcu/common';

export class ComponentSelectorDialogConfig {
	public AllowedTypes: string[];

	public ExcludeTypes: string[];
}

export class ComponentSelectorDialogResult {
	public BuilderState: string;

	public Control: RenderingControl;
}

@Component({
	selector: 'forge-component-selector',
	templateUrl: './component-selector.dialog.html',
	styleUrls: ['./component-selector.dialog.scss']
})
export class ComponentSelectorDialog implements OnInit {
	//  Fields

	//  Properties
	public Setups: DisplayModuleSetup[];

	//  Constructors
	constructor(protected dialogRef: MatDialogRef<ComponentSelectorDialog>,
		@Inject(MAT_DIALOG_DATA) protected config: ComponentSelectorDialogConfig,
		protected buildersSvc: IBuildersService) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.buildersSvc.LoadDisplayModules().subscribe(
			(result) => {
				if (isResultSuccess(result)) {
					this.Setups = result.Model;
				} else {

				}
			});
	}

	//	API Methods
	public Cancel() {
		this.dialogRef.close(<BaseModeledResponse<ComponentSelectorDialogResult>>{
			Model: null,
			Status: <Status>{
				Code: 1,
				Message: 'Cancelled'
			}
		});
	}

	public Save(module: DisplayModuleConfig) {
		if (confirm(`Are you sure you want to select ${module.Name}?`)) {
			this.dialogRef.close(<BaseModeledResponse<ComponentSelectorDialogResult>>{
				Model: {
					Control: module.Control,
					BuilderState: module.BuilderState
				},
				Status: <Status>{
					Code: 0,
					Message: 'Success'
				}
			});
		}
	}

	//	Helpers
}
