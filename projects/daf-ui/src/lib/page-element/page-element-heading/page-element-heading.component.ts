import { Component, OnInit, Input, Injector } from '@angular/core';
import { CoreComponent } from '../core.component';
import { PageElement } from '@lcu/elements';
import { ForgePageService } from '@lcu/daf-common';

@Component({
	selector: 'forge-page-element-heading',
	templateUrl: './page-element-heading.component.html',
	styleUrls: ['./page-element-heading.component.scss'],
	host: {
		'[style.display]': '"contents"'
	},
})
export class PageElementHeadingComponent extends CoreComponent {
	//	Fields

	//	Properties
	public get BuilderState(): string {
		return this.Element.BuilderState ? this.Element.BuilderState : 'Render';
	}

	@Input('element')
	public Element: PageElement;

	@Input('page-save')
	public PageSave: boolean;

	@Input('show-main-menu-actions')
	public ShowMainMenuActions: boolean;

	//	Constructors
	constructor(protected pgSvc: ForgePageService, protected injector: Injector) {
		super(injector);
		
		this.ShowMainMenuActions = true;
	}

	//	Life Cycle

	//	API Methods

	//	Helpers
	protected updateElement() {
		if (this.PageSave)
			this.pgSvc.UpdatePageElement(this.Element);
	}
}
