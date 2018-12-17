import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
	MatButtonModule, MatIconModule, MatListModule,
	MatPaginatorModule, MatProgressSpinnerModule, MatTableModule
} from '@angular/material';

import { FathymSharedModule } from '@lcu/hosting';

import { GenericDomainListComponent } from './generic-domain-list.component';

@NgModule({
	imports: [
		FathymSharedModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatTableModule,
	],
	declarations: [
		GenericDomainListComponent,
	],
	exports: [
		GenericDomainListComponent,
	]
})
export class GenericDomainModule { }
