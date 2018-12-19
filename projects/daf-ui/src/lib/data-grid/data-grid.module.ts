import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DataGridPipes } from './utils/pipes/data-grid.pipes';

import {
  MatFormFieldModule,
  MatTableModule,
  MatSortModule, MatPaginatorModule,
  MatCheckboxModule
} from '@angular/material';

// import { FathymSharedModule } from '@lcu/common';
// import { ForgeDisplayDirective } from '../display/display.directive';
import { DataGridComponent } from './data-grid.component';

@NgModule({
	imports: [
    // FathymSharedModule,
    CommonModule,
		MatFormFieldModule,
		MatTableModule,
		MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule
	],
	declarations: [
  DataGridComponent,
  DataGridPipes
	],
	exports: [
	DataGridComponent,
  MatCheckboxModule,
  DataGridPipes
	]
})
export class DataGridModule { }
