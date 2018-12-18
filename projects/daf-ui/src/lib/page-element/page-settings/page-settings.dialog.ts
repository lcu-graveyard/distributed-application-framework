import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTabGroup } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { NgxEditorModel } from 'ngx-monaco-editor';
import { Loading, BaseModeledResponse } from '@lcu/core';
import { Status, isStatusSuccess } from '@lcu/common';
import { DatabaseConfiguration, ForgeSettings } from '@lcu/apps';
import { PageSettings } from '@lcu/elements';
import { PageSettingsContext, DBConfigContext, ForgeSettingsContext, PageUIService } from '@lcu/daf-common';

@Component({
	selector: 'page-settings-dialog',
	templateUrl: './page-settings.dialog.html',
	styleUrls: ['./page-settings.dialog.scss']
})
export class PageSettingsDialog implements OnInit {
	//	Fields

	//	Properties
	public get DataSetKeys(): string[] {
		return Object.keys(this.DBConfig.DataSets);
	}

	public DBConfig: DatabaseConfiguration;

	public ForgeSettings: ForgeSettings;

	public Loading: Loading;

	public NewDataSetKey: string;

	public PageSettings: PageSettings;

	public StyleEditorOptions: NgxEditorModel;

	@ViewChild(MatTabGroup)
	public Tabs: MatTabGroup;

	//	Constructors
	constructor(protected dialogRef: MatDialogRef<PageSettingsDialog>, @Inject(MAT_DIALOG_DATA) public Lookup: string,
		protected pageSettings: PageSettingsContext, protected route: ActivatedRoute, protected dbConfig: DBConfigContext,
		protected forgeSettings: ForgeSettingsContext, protected pgUiSvc: PageUIService) {
		this.Loading = new Loading();
	}

	//	Life Cycle
	public ngOnInit() {
		this.dbConfig.Context.subscribe(dbConfig => this.DBConfig = dbConfig);

		this.dbConfig.Loading.subscribe(loading => this.Loading.Set(loading));

		this.forgeSettings.Context.subscribe(settings => {
			this.ForgeSettings = settings;

			if (!this.ForgeSettings)
				this.ForgeSettings = <any>{};

			if (!this.ForgeSettings.Theme)
				this.ForgeSettings.Theme = { Style: '', Details: {} };
		});

		this.forgeSettings.Loading.subscribe(loading => this.Loading.Set(loading));

		this.pageSettings.Context.subscribe(settings => {
			this.PageSettings = settings;

			if (!this.PageSettings)
				this.PageSettings = <any>{};

			if (!this.PageSettings.Theme)
				this.PageSettings.Theme = { Style: '', Details: {} };
		});

		this.pageSettings.Loading.subscribe(loading => this.Loading.Set(loading));

		this.StyleEditorOptions = <NgxEditorModel>{
			//theme: 'vs-dark',
			language: 'scss'
		};
	}

	//	API Methods
	public AddDataSet() {
		if (this.NewDataSetKey) {
			if (!this.DBConfig.DataSets)
				this.DBConfig.DataSets = {};

			this.DBConfig.DataSets[this.NewDataSetKey] = {
				Query: {
					Limit: null,
					OrderBy: null,
					Parameters: {},
					Select: null,
					Singleton: false,
					Where: null
				},
				Sorting: null,
				Type: ''
			};

			this.NewDataSetKey = '';
		}
	}

	public Cancel() {
		this.dialogRef.close(<BaseModeledResponse<DatabaseConfiguration>>{
			Model: null,
			Status: <Status>{
				Code: 1,
				Message: 'Cancelled'
			}
		});
	}

	public DataSetTypeChange(dataSetKey: string, type: string) {
		this.pgUiSvc.Notify.Signal(dataSetKey + type);
	}

	public DeleteDataSet(dataSetKey: string) {
		if (confirm(`Are you sure you want to remove Data Ste with key '${dataSetKey}'?`))
			delete this.DBConfig.DataSets[dataSetKey];
	}

	public SaveDBConfig() {
		this.Loading.Set(true);

		this.dbConfig.Save(this.DBConfig).subscribe(
			(status) => {
				if (isStatusSuccess(status)) {
					this.dialogRef.close(<BaseModeledResponse<DatabaseConfiguration>>{
						Model: this.DBConfig,
						Status: <Status>{
							Code: 0,
							Message: 'Success'
						}
					});
				} else {
					this.pgUiSvc.Notify.Signal(status.Message);

					this.Loading.Set(false);
				}
			},
			(error) => {
				this.Loading.Set(false);
			},
			() => {
			});
	}

	public SaveForgeSettings() {
		this.Loading.Set(true);

		this.forgeSettings.Save(this.ForgeSettings).subscribe(
			(status) => {
				if (isStatusSuccess(status)) {
					this.dialogRef.close(<BaseModeledResponse<DatabaseConfiguration>>{
						Model: this.DBConfig,
						Status: <Status>{
							Code: 0,
							Message: 'Success'
						}
					});
				} else {
					this.pgUiSvc.Notify.Signal(status.Message);

					this.Loading.Set(false);
				}
			},
			(error) => {
				this.Loading.Set(false);
			},
			() => {
			});
	}

	public SavePageSettings() {
		this.Loading.Set(true);

		this.pageSettings.Save(this.PageSettings).subscribe(
			(status) => {
				if (isStatusSuccess(status)) {
					this.dialogRef.close(<BaseModeledResponse<DatabaseConfiguration>>{
						Model: this.DBConfig,
						Status: <Status>{
							Code: 0,
							Message: 'Success'
						}
					});
				} else {
					this.pgUiSvc.Notify.Signal(status.Message);

					this.Loading.Set(false);
				}
			},
			(error) => {
				this.Loading.Set(false);
			},
			() => {
			});
	}
}
