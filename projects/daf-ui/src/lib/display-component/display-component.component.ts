import { SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Type, DoCheck, Inject, Output } from '@angular/core';
import { IComponentDisplayConfig, PageElement, IBuildersService, ComponentDisplayConfig } from '@lcu/elements';

@Component({
	selector: 'display-component',
	templateUrl: './display-component.component.html',
	styleUrls: ['./display-component.component.scss'],
	host: {
		'[style.display]': '"contents"'
	},
})
export class DisplayComponentComponent implements DoCheck, OnInit {
	//	Fields
	protected changeTracking: string;

	//	Properties
	@Input('config')
	public Config: IComponentDisplayConfig;

	@Input('dragOp')
	public DragOperation: string;

	@Output('dragOpChange')
	public DragOperationChange: EventEmitter<string> = new EventEmitter();

	@Input('element')
	public Element: PageElement;

	public get CurrentDisplay(): Type<any> {
		return this.Config && this.Config.State && this.Config.Display && this.Config.Display[this.Config.State]
			? this.Config.Display[this.Config.State]() : null;
	}

	@Input('context')
	public Context: any;

	@Input('data')
	public Data: any;

	@Input('state')
	public State: 'Render' | 'Builder' | 'Marketplace';

	//	Constructors
	constructor(protected buildersSvc: IBuildersService) {
		this.State = 'Render';

		this.DragOperationChange = new EventEmitter();
	}

	//	Life Cycle
	public ngOnInit() {
		this.processControlConfig();
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (changes['Element'] || changes['Context'] || changes['Data'] || changes['State'] || changes['Config']) {
			this.processControlConfig();
		}
	}

	public ngDoCheck() {
		if (this.trackChanges() != this.changeTracking)
			this.processControlConfig();
	}

	//	API Methods
	public BuildDisplayConfiguration() {
		var base = this.Element && this.Element.Control ? this.Element.Control.Base : '',
			type = this.Element.Control ? this.Element.Control.Type : '';

		var displayConfig = this.buildersSvc.ResolveDisplayModule(base, type);

		if (displayConfig)
			return <ComponentDisplayConfig>{
				Display: displayConfig,
				Context: { Element: this.Element, Data: this.Data, State: this.State, Context: this.Context },
				State: this.State
			};
		else
			return null;
	}

	public ChangeDragOperation(op: string) {
		this.DragOperation = op;

		this.DragOperationChange.emit(op);

		return false;
	}

	//	Helpers
	protected processControlConfig() {
		if (this.Element)
			this.Config = this.BuildDisplayConfiguration();
		else if (this.Config)
			this.Config.State = this.State;

		this.changeTracking = this.trackChanges();
	}

	protected trackChanges() {
		var data = this.Data ? Object.keys(this.Data) : '';

		var ctrl = this.Element && this.Element.Control ? this.Element.Control.Base + this.Element.Control.Type : '';

		return `${ctrl}-${this.State}-${data}`;
	}
}