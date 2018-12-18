import { Injector } from '@angular/core';
import { EventEmitter, OnInit, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { isResultSuccess } from '@lcu/core';
import { PageElement } from '@lcu/elements';
import { PageUIService } from '@lcu/daf-common';
import { ControlBuilderDialog } from '../control-builder/control-builder.dialog';
import { PageElementSettingsDialog } from './page-element-settings/page-element-settings.dialog';

export abstract class CoreComponent {
	//	Fields
	protected pgUiSvc: PageUIService;

	//	Properties
	@Input('context')
	public Context: any;

	//	Constructors
	constructor(protected injector: Injector) {
		this.pgUiSvc = injector.get(PageUIService);
	}

	//	Life Cycle

	//	API Methods
	public OpenBuilderDialog(pe: PageElement) {
		var dialogRef = this.pgUiSvc.Dialog.Open(ControlBuilderDialog, { Element: pe || {}, Context: this.Context }, (result) => {
			if (isResultSuccess(result)) {
				pe = Object.assign(pe, result.Model);

				this.updateElement();
			}
		}, '90%');
	}

	public OpenElementSettings(pe: PageElement) {
		var dialogRef = this.pgUiSvc.Dialog.Open(PageElementSettingsDialog, pe || {}, (result) => {
			if (isResultSuccess(result)) {
				pe = Object.assign(pe, result.Model);

				this.updateElement();
			}
		}, '90%');
	}

	//	Helpers
	protected updateElement() {
	}
}
