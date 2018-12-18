import { NgModule } from '@angular/core';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { FathymSharedModule } from '@lcu/hosting';
import { SolutionElementComponent } from './solution-element/solution-element.component';
import { DisplaySolutionComponent } from './display-solution/display-solution.component';
import { DisplayModule } from './../display/display.module';

var comps = [
	DisplaySolutionComponent,
	SolutionElementComponent,
];

@NgModule({
	imports: [
		FathymSharedModule,
		DisplayModule,
		MatIconModule,
		MatTabsModule,
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
export class SolutionsModule { }
