import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageConfig, PageElement, PageSettings, PagesSetup } from '@lcu/elements';
import { Loading, isResultSuccess, BaseModeledResponse } from '@lcu/core';
import { ForgePageService, PagesSetupContext, PageUIService } from '@lcu/daf-common/lcu.api';
import { ComponentSelectorDialogConfig, ComponentSelectorDialogResult, ComponentSelectorDialog } from '../component-selector/component-selector.dialog';
import { PageSettingsDialog } from '../page-element/page-settings/page-settings.dialog';
import { isStatusSuccess } from '@lcu/common';

@Component({
	selector: 'page-view',
	templateUrl: './page-view.control.html',
	styleUrls: ['./page-view.control.scss']
})
export class PageViewControl {
	//	Fields
	protected lookup: string;

	//	Properties
	public get ActivePageConfig(): PageConfig {
		if (!this.Setup || !this.Lookup)
			return null;

		return this.Setup.Configs.find(cfg => cfg.Lookup == this.Lookup);
	}

	public DragOperation: string;

	public get Data() {
		return this.pgSvc.Data;
	}

	public get Elements(): PageElement[] {
		return this.pgSvc.Elements || [];
	}

	@Input('hide-editing')
	public HideEditing: boolean;

	@Input('hide-pages-list')
	public HidePagesList: boolean;

	@Input('hide-tutorial')
	public HideTutorial: boolean;

	public get IsBuild(): boolean {
		return this.State == 'Builder';
	}

	public Loading: Loading;

	@Input('lookup')
	public set Lookup(lookup: string) {
		this.lookup = lookup;

		this.refresh();
	}

	public get Lookup(): string {
		return this.lookup;
	}

	public get Settings(): PageSettings {
		return this.pgSvc.Settings || <PageSettings>{};
	}

	public Setup: PagesSetup;

	public State: 'Render' | 'Builder' | 'Marketplace';

	@Input('use-nav-end')
	public UseNavigationEnd: boolean;

	//	Constructors
	constructor(protected pgSvc: ForgePageService,
		protected pagesSetup: PagesSetupContext, protected pageUiSvc: PageUIService) {
		this.Loading = new Loading();
	}

	//	Life Cycle
	public ngOnInit() {
		this.pagesSetup.Loading.subscribe(loading => this.Loading.Set(loading));

		this.pagesSetup.Context.subscribe(setup => {
			this.Setup = setup;
		});

		this.pgSvc.Loading.subscribe(loading => this.Loading.Set(loading));

		this.pgSvc.CSSPath.subscribe(cssPath => {
			if (cssPath) {
				var link = <HTMLLinkElement>document.getElementById('pageCSS');

				if (!link) {
					link = document.createElement('link');

					link.id = 'pageCSS';

					link.rel = 'stylesheet';

					link.href = cssPath;

					document.body.appendChild(link);
				} else {
					link.href = cssPath;
				}
			}
		});

		this.State = 'Render';
	}

	//	API Methods
	public AddPageElement() {
		var dialogRef = this.pageUiSvc.Dialog.Open(ComponentSelectorDialog, <ComponentSelectorDialogConfig>{
			AllowedTypes: []
		}, (result: BaseModeledResponse<ComponentSelectorDialogResult>) => {
			if (isResultSuccess(result)) {
				var pe = <PageElement>{
					Control: Object.assign({}, result.Model.Control),
					PageLookup: this.Lookup,
					Order: this.pgSvc.NextOrder,
					Title: '',
					BuilderState: result.Model.BuilderState
				};

				this.pgSvc.AddPageElement(pe);
			}
		}, '90%');
	}

	public ChangeDragOperation(op: string) {
		this.DragOperation = op;

		return false;
	}

	public CloseEditing() {
		this.Loading.Set(true);

		this.pgSvc.RefreshSettings(this.Lookup).subscribe(
			(status) => {
				this.State = 'Render';

				this.Loading.Set(false);
			});
	}

	public OpenPageSettingsDialog() {
		var dialogRef = this.pageUiSvc.Dialog.Open(PageSettingsDialog, this.Lookup, (result) => {
			if (isResultSuccess(result)) {
				this.refresh();
			}
		}, '90%');
	}

	public Save() {
		this.Loading.Set(true);

		this.pgSvc.Save().subscribe(
			(status) => {
				if (isStatusSuccess(status)) {
				} else {

				}
			},
			(err) => {
			},
			() => {
				this.Loading.Set(false);
			});
	}

	//	Helpers
	protected refresh() {
		this.pgSvc.RefreshSettings(this.Lookup).subscribe();

		this.pagesSetup.Load();
	}

	protected updateElement(pe: PageElement) {
		return this.pgSvc.UpdatePageElement(pe);
	}
}
