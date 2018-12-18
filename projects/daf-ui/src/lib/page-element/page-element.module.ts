import { NgModule } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { PageElementComponent } from './page-element.component';
import { PageSettingsDialog } from './page-settings/page-settings.dialog';
import { PageElementSettingsDialog } from './page-element-settings/page-element-settings.dialog';
import { PageElementHeadingComponent } from './page-element-heading/page-element-heading.component';

var comps = [
	PageElementComponent,
	PageSettingsDialog,
	PageElementSettingsDialog,
	PageElementHeadingComponent,
];

@NgModule({
	imports: [
		FathymSharedModule,
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
