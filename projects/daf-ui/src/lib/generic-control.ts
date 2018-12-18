import { HostBinding, Injector } from '@angular/core';
import { ForgeRenderingDetails, PageElement } from '@lcu/elements';
import { CoreRepeaterComponent } from './page-element/core-repeater.component';
import { ComponentSelectorDialog, ComponentSelectorDialogConfig, ComponentSelectorDialogResult } from './component-selector/component-selector.dialog';
import { isResultSuccess, BaseModeledResponse } from '@lcu/core';

export class ForgeGenericControl<TDetails extends ForgeRenderingDetails<TConfig>, TConfig> extends CoreRepeaterComponent {
    //	Fields
    protected children: { Element: PageElement, Config: TConfig }[];

    protected controlCheck: string;

    //	Properties
    public get Details(): TDetails {
        if (!this.Element)
            return null;

        return this.Element.Control.Details;
    }

    @HostBinding('style.display')
    public StyleDisplay: string = 'contents';

    //  Constructors
    constructor(injector: Injector) {
        super(injector);
    }

    //	Life Cycle

    //	API Methods
    public AddPageElement() {
        var dialogRef = this.pgUiSvc.Dialog.Open(ComponentSelectorDialog, <ComponentSelectorDialogConfig>{
            AllowedTypes: []
        }, (result: BaseModeledResponse<ComponentSelectorDialogResult>) => {
            if (isResultSuccess(result)) {
                var pe = <PageElement>{
                    Control: Object.assign({}, result.Model.Control),
                    PageLookup: this.pgSvc.Lookup,
                    Order: this.pgSvc.NextOrder,
                    Title: '',
                    BuilderState: result.Model.BuilderState
                };

                this.Details.Elements.push(pe);

                this.Details.Configs.push(this.loadDefaultConfig());

                this.updateElement();
            }
        }, '90%');
    }

    public GetBuilderState(pe: PageElement): string {
        return pe.BuilderState == 'Builder' ? this.State : 'Render';//pe.BuilderState ? pe.BuilderState : 'Render';
    }

    public RemovePageElement(pe: PageElement, index: number) {
        if (confirm(`Are you sure you want to delete '${pe.Title}' element?`)) {
            this.Details.Elements.splice(index, 1);

            this.Details.Configs.splice(index, 1);

            this.updateElement();
        }
    }

    public SetConfigValue(config: TConfig, key: string, value: any) {
        config[key] = value;

        this.updateElement();
    }

    public SetState(state: 'Builder' | 'Marketplace' | 'Render') {
        this.State = state;
    }

    //	Helpers
    protected loadDefaultConfig() {
        return <TConfig>{};
    }

    protected loadRepeatableConfigs() {
        return this.Details.Configs;
    }

    protected loadRepeatableElements() {
        return this.Details.Elements;
    }

    protected shouldUseDisplayElements() {
        return true;
    }
}
