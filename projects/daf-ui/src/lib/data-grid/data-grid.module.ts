import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
	MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule
} from '@angular/material';

// import { FathymSharedModule } from '@lcu/common';
import { ForgeDisplayDirective } from '../display.directive';
import { DataGridComponent } from './data-grid.component';

@NgModule({
	imports: [
		// FathymSharedModule,
		MatFormFieldModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule
	],
	declarations: [
	DataGridComponent,
	ForgeDisplayDirective
	],
	exports: [
	DataGridComponent,
	ForgeDisplayDirective
	]
})
export class DataGridModule { }
