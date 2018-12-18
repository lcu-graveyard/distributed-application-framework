import { Component, EventEmitter, OnInit, Input, Output, SimpleChanges, OnChanges, Injector } from '@angular/core';
import { CoreRepeaterComponent } from './core-repeater.component';

@Component({
	selector: 'forge-page-element',
	templateUrl: './page-element.component.html',
	styleUrls: ['./page-element.component.scss'],
	host: {
		'[style.display]': '"contents"'
	},
})
export class PageElementComponent extends CoreRepeaterComponent {
	//	Fields

	//	Properties
	public get BuilderState(): string {
		return this.State == 'Builder' && this.Element.BuilderState ? this.Element.BuilderState : 'Render';
	}

	@Input('force-header')
	public ForceHeader: boolean;

	public get HasRepeaterDataSet(): boolean {
		return this.hasRepeaterDataSet(this.Element);
	}

	@Input('page-save')
	public PageSave: boolean;

	@Input('show-delete-action')
	public ShowDeleteAction: boolean;

	@Input('show-main-menu-actions')
	public ShowMainMenuActions: boolean;

	//	Constructors
	constructor(protected injector: Injector) {
		super(injector);
	
		this.ShowDeleteAction = true;

		this.ShowMainMenuActions = true;
	}

	//	Life Cycle
	
	//	API Methods
	public RemovePageElement() {
		if (confirm(`Are you sure you want to delete '${this.Element.Title}'?`)) {
			this.pgSvc.RemovePageElement(this.Element);
		}
	}

	public SetPageElementValue(key: string, value: any) {
		this.Element[key] = value;

		this.updateElement();
	}

	//	Helpers
	protected executeContextToDetailsMapping() {
		if (this.Context && this.Element.Rendering && this.Element.Rendering.DataMap) {
			var outputs = this.dataMapper.Map(this.Element.Rendering.DataMap, [this.Context], this.Data);

			outputs.forEach(output => {
				this.Element.Control.Details = Object.assign(this.Element.Control.Details, output);
			});
		}
	}

	protected loadRepeatableConfigs() {
		return [{}];
	}

	protected loadRepeatableElements() {
		return [this.Element];
	}
	
	protected shouldUseDisplayElements() {
		return this.HasRepeaterDataSet && !this.ForceHeader;
	}
}
