import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
	MatButtonModule, MatIconModule, MatListModule,
	MatPaginatorModule, MatProgressSpinnerModule, MatTableModule
} from '@angular/material';

import { FathymSharedModule } from '@lcu/hosting';
import { ForgeDisplayDirective } from './display.directive';

var comps = [
];

var dirs = [
	ForgeDisplayDirective
];

@NgModule({
	imports: [
		FathymSharedModule,
	],
	declarations: [
		...comps,
		...dirs,
	],
	exports: [
		...comps,
		...dirs,
	],
	entryComponents: [
		...comps,
	]
})
export class DisplayModule { }
