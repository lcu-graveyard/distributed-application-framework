import { SimpleChanges } from '@angular/core';
import { Directive, EventEmitter, Input, OnInit, OnChanges, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, Type, ComponentRef, Output } from '@angular/core';

@Directive({
	selector: '[forge-display]',
	exportAs: 'display'
})
export class ForgeDisplayDirective implements OnInit {
	//	Fields
	protected compRef: ComponentRef<any>;

	protected changeTracking: string;

	//	Properties
	@Input('forge-display')
	public Component: Type<any>;

	@Input('context')
	public Context: any;

	@Input('dragOp')
	public DragOperation: string;

	@Output('dragOpChange')
	public DragOperationChange: EventEmitter<string> = new EventEmitter();

	//	Constructors
	constructor(protected view: ViewContainerRef, protected componentFactoryResolver: ComponentFactoryResolver) {
		this.DragOperationChange = new EventEmitter();
	}

	//	Life Cycle
	public ngOnInit() {
		this.processComponent();
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (changes['Component'] || changes['Context']) {
			this.processComponent();
		}
	}

	public ngDoCheck() {
		if (this.trackChanges() != this.changeTracking)
			this.processComponent();
	}

	//	API Methods

	//	Helpers
	protected processComponent() {
		try {
			if (this.Component) {
				let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.Component);

				this.view.clear();

				this.compRef = this.view.createComponent(componentFactory);
				
				if (this.compRef['DragOperationChange'])
					this.compRef['DragOperationChange'].subscribe(dragOp => {
						this.DragOperationChange.emit(dragOp);
					});

				this.updateCompileProperties();
			}
		} catch (err) {
			console.log(err);
		}

		this.changeTracking = this.trackChanges();
	}

	protected trackChanges() {
		var ctxt = this.Context ? Object.keys(this.Context) : '';

		var type = this.Component ? this.Component.toString() : '';

		return `${type}-${ctxt}`;
	}

	protected updateCompileProperties() {
		if (this.Context)
			for (var prop in this.Context) {
				try {
					this.compRef.instance[prop] = this.Context[prop];
				} catch (err) { }
			}
	}
}