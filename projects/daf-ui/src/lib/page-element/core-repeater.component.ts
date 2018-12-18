import { Injector } from '@angular/core';
import { EventEmitter, OnInit, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { CoreComponent } from './core.component';
import { DataMapperService, ForgePageService, DataFlowContext } from '@lcu/daf-common';
import { PageElement } from '@lcu/elements';

export abstract class CoreRepeaterComponent extends CoreComponent implements OnChanges, OnInit {
	//	Fields
	protected dataMapper: DataMapperService;
	
	protected displayElements: { [key: number]: { Element: PageElement, Config: any, Context: any }[] };

	protected pgSvc: ForgePageService;

	//	Properties
	@Input('data')
	public Data: { [key: string]: DataFlowContext<any> };

	public get DataSetKeys(): string[] {
		return this.Data ? Object.keys(this.Data) : [];
	}

	@Input('dragOp')
	public DragOperation: string;

	@Output('dragOpChange')
	public DragOperationChange: EventEmitter<string> = new EventEmitter();

	@Input('element')
	public Element: PageElement;

	public RenderElements: { Element: PageElement, Config: any, Context: any }[];

	@Input('state')
	public State: 'Builder' | 'Marketplace' | 'Render';

	//	Constructors
	constructor(protected injector: Injector) {
		super(injector);

		this.dataMapper = injector.get(DataMapperService);
		
		this.pgSvc = injector.get(ForgePageService);

		this.displayElements = {};

		this.DragOperationChange = new EventEmitter();

		this.RenderElements = [];
	}

	//	Life Cycle
	public ngOnInit() {
		this.controlChanged();

		this.pgSvc.DataChange.subscribe(status => {
			this.controlChanged();
		});
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (changes['Element'] || changes['Context'] || changes['Data']) {
			this.controlChanged();
		}
	}

	//	API Methods
	public ChangeDragOperation(op: string) {
		this.DragOperation = op;

		this.DragOperationChange.emit(op);

		return false;
	}

	public SetPageElementValue(key: string, value: any) {
		this.Element[key] = value;

		this.updateElement();
	}

	//	Helpers
	protected controlChanged() {
		this.setupRenderElements();
	}

	protected executeContextToDetailsMapping(mapping: { Element: PageElement, Config: any, Context: any }) {
		if (mapping.Context && mapping.Element.Rendering && mapping.Element.Rendering.DataMap) {
			var outputs = this.dataMapper.Map(mapping.Element.Rendering.DataMap, [mapping.Context], this.Data);

			outputs.forEach(output => {
				mapping.Element.Control.Details = Object.assign(mapping.Element.Control.Details, output);
			});
		}
	}

	protected hasRepeaterDataSet(el: PageElement): boolean {
		return !!el && !!el.Rendering && !!el.Rendering.RepeaterDataSet && !!this.Data && !!this.Data[el.Rendering.RepeaterDataSet];
	}

	protected abstract loadRepeatableElements(): PageElement[];

	protected abstract loadRepeatableConfigs(): any[];

	protected prepareContext(d: any) {
		var context = !this.Context ? d : [d];

		if (Array.isArray(this.Context))
			context.push(...this.Context);
		else if (Array.isArray(context))
			context.push(this.Context);

		return context;
	}

	protected setRenderElements() {
		if (this.shouldUseDisplayElements()) {
			var keys = Object.keys(this.displayElements);

			var els = [];

			keys.forEach(k => {
				var elSet = this.displayElements[k];

				elSet.forEach(el => {
					this.executeContextToDetailsMapping(el);

					els.push(el);
				});
			});

			this.RenderElements = els;
		} else {
			this.RenderElements = [{ Element: this.Element, Config: null, Context: this.Context }];
		}
	}

	protected setupRenderElements() {
		this.displayElements = {};

		var els = this.loadRepeatableElements();
		
		if (els) {
			var configs = this.loadRepeatableConfigs();
			
			els.forEach((pe, i) => {
				var config = configs[i];

				this.displayElements[i] = [];

				if (this.hasRepeaterDataSet(pe)) {
					this.Data[pe.Rendering.RepeaterDataSet].Data.subscribe(data => {
						this.displayElements[i] = data.map(d => {
							var newPe = <PageElement>JSON.parse(JSON.stringify(pe));

							newPe.Rendering.RepeaterDataSet = null;

							return {
								Element: newPe,
								Config: config,
								Context: this.prepareContext(d)
							};
						});

						this.setRenderElements();
					});
				}
				else{
					this.displayElements[i].push({ Element: pe, Config: config, Context: this.Context });

					this.setRenderElements();
				}
			});

			this.setRenderElements();
		}
	}

	protected abstract shouldUseDisplayElements(): boolean;

	protected updateElement() {
		super.updateElement();
		
		if (this.Element.PageSave)
			this.pgSvc.UpdatePageElement(this.Element);
		
		this.controlChanged();
	}
}
