import { NgModule } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { SolutionElementComponent } from './solution-element/solution-element.component';
import { DisplaySolutionComponent } from './display-solution/display-solution.component';

var comps = [
	DisplaySolutionComponent,
	SolutionElementComponent,
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
export class SolutionsModule { }
