import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatFormFieldModule,
  MatTableModule,
  MatSortModule, MatPaginatorModule,
  MatCheckboxModule
} from '@angular/material';

// import { FathymSharedModule } from '@lcu/common';
import { ForgeDisplayDirective } from '../display/display.directive';
import { DataGridComponent } from './data-grid.component';

@NgModule({
	imports: [
		// FathymSharedModule,
		MatFormFieldModule,
		MatTableModule,
		MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule
	],
	declarations: [
	DataGridComponent,
	ForgeDisplayDirective
	],
	exports: [
	DataGridComponent,
  ForgeDisplayDirective,
  MatCheckboxModule
	]
})
export class DataGridModule { }
