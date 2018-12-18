import { NgModule } from '@angular/core';
import { ComponentSelectorModule } from './component-selector/component-selector.module';
import { ControlBuilderModule } from './control-builder/control-builder.module';
import { DataGridModule } from './data-grid/data-grid.module';
import { DisplayModule } from './display/display.module';
import { DisplayComponentModule } from './display-component/display-component.module';
import { GenericDomainModule } from './generic-domain/generic-domain.module';
import { PageElementModule } from './page-element/page-element.module';

var modules = [
	ComponentSelectorModule,
	ControlBuilderModule,
	// DataGridModule,
	DisplayModule,
	DisplayComponentModule,
	GenericDomainModule,
	PageElementModule,
];

@NgModule({
	imports: [
		...modules,
	],
	declarations: [
	],
	exports: [
		...modules,
	]
})
export class DAFUIModule { }