import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
	MatButtonModule, MatIconModule, MatListModule,
	MatPaginatorModule, MatProgressSpinnerModule, MatTableModule, MatTabsModule, MatDialogModule
} from '@angular/material';

import { FathymSharedModule } from '@lcu/hosting';
import { ComponentSelectorDialog } from './component-selector.dialog';

@NgModule({
	imports: [
		FathymSharedModule,
		
		ReactiveFormsModule,
		MatButtonModule,
		MatDialogModule,
		MatIconModule,
		MatListModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatTabsModule,
		MatTableModule,
	],
	declarations: [
		ComponentSelectorDialog,
	],
	exports: [
		ComponentSelectorDialog,
	],
	entryComponents: [
		ComponentSelectorDialog
	]
})
export class ComponentSelectorModule { }
