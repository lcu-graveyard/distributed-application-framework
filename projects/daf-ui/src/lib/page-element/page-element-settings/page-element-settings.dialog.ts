import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTabGroup } from '@angular/material';
import { Status } from '@lcu/common';
import { BaseModeledResponse } from '@lcu/core';
import { NgxEditorModel } from 'ngx-monaco-editor';
import { DataMapperMappedDetails, DataMapperShowHideDetails, DatabaseConfiguration, DataMapperConfig } from '@lcu/apps';
import { PageElement } from '@lcu/elements';
import { DataMapperService, DBConfigContext, PageUIService } from '@lcu/daf-common';

@Component({
	selector: 'page-element-settings-dialog',
	templateUrl: './page-element-settings.dialog.html',
	styleUrls: ['./page-element-settings.dialog.scss']
})
export class PageElementSettingsDialog implements OnInit {
	//	Fields

	//	Properties
	public get DataSetKeys(): string[] {
		return Object.keys(this.DBConfig.DataSets);
	}

	public get DataMapMapperDetails(): DataMapperMappedDetails {
		if (this.Element.Rendering && this.Element.Rendering.DataMap && this.Element.Rendering.DataMap.Details) {
			var dets = (<DataMapperMappedDetails>this.Element.Rendering.DataMap.Details);

			if (!dets.Map)
				dets.Map = {};

			return dets;
		} else {
			return {
				Map: {}
			};
		}
	}

	public get DataMapShowHideDetails(): DataMapperShowHideDetails {
		if (this.Element.Rendering && this.Element.Rendering.DataMap && this.Element.Rendering.DataMap.Details) {
			var dets = (<DataMapperShowHideDetails>this.Element.Rendering.DataMap.Details);

			if (!dets.Left)
				dets.Left = { Output: '', Reference: 'Context' };

			if (!dets.Right)
				dets.Right = { Output: '', Reference: 'Context' };

			return dets;
		} else {
			return {
				Left: { Output: '', Reference: 'Context' },
				Right: { Output: '', Reference: 'Context' }
			};
		}
	}

	public get DataMapMapperInputs(): string[] {
		return this.DataMapMapperDetails && this.DataMapMapperDetails.Map ? Object.keys(this.DataMapMapperDetails.Map) : [];
	}

	public DBConfig: DatabaseConfiguration;

	public Element: PageElement;

	public NewMapperInput: string;

	public StyleEditorOptions: NgxEditorModel;

	@ViewChild('tabs')
	public Tabs: MatTabGroup;

	//	Constructors
	constructor(protected dialogRef: MatDialogRef<PageElementSettingsDialog>, @Inject(MAT_DIALOG_DATA) element: PageElement,
		protected dataMapper: DataMapperService, protected dbConfig: DBConfigContext, protected pgUiSvc: PageUIService) {
		this.Element = JSON.parse(JSON.stringify(element));
	}

	//	Life Cycle
	public ngOnInit() {
		this.StyleEditorOptions = <NgxEditorModel>{
			//theme: 'vs-dark',
			language: 'scss'
		};

		this.dbConfig.Context.subscribe(dbConfig => this.DBConfig = dbConfig);

		if (!this.Element.Rendering)
			this.Element.Rendering = <any>{};

		if (!this.Element.Rendering.DataMap)
			this.Element.Rendering.DataMap = <DataMapperConfig>{ Details: {} };
	}

	//	API Methods
	public AddDataMapMapperInput() {
		if (this.NewMapperInput) {
			if (!this.DataMapMapperDetails.Map[this.NewMapperInput]) {
				this.DataMapMapperDetails.Map[this.NewMapperInput] = {
					Output: '',
					Reference: 'Context',
				};

				this.NewMapperInput = '';
			} else {
				this.pgUiSvc.Notify.Signal('The input key already exists');
			}
		}
	}

	public DeleteDataMapMapperInput(input: string) {
		if (input && confirm(`Are you sure you want to remove '${input}'?`)) {
			delete this.DataMapMapperDetails.Map[input];
		}
	}

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
		if (!this.Element.Rendering.DataMap.MapType)
			this.Element.Rendering.DataMap = undefined;

		this.dialogRef.close(<BaseModeledResponse<PageElement>>{
			Model: this.Element,
			Status: <Status>{
				Code: 0,
				Message: 'Success'
			}
		});
	}
}
