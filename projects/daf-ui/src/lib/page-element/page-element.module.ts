import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { FathymSharedModule } from '@lcu/hosting';
import { PageElementComponent } from './page-element.component';
import { PageSettingsDialog } from './page-settings/page-settings.dialog';
import { PageElementSettingsDialog } from './page-element-settings/page-element-settings.dialog';
import { PageElementHeadingComponent } from './page-element-heading/page-element-heading.component';
import { DisplayComponentModule } from '../display-component/display-component.module';

var comps = [
	PageElementComponent,
	PageSettingsDialog,
	PageElementSettingsDialog,
	PageElementHeadingComponent,
];

@NgModule({
	imports: [
		FathymSharedModule,
		DisplayComponentModule,
		MatToolbarModule,
	],
	declarations: [
		...comps,
	],
	exports: [
		...comps,
	],
	entryComponents: [
		...comps,
	]
})
export class PageElementModule { }
