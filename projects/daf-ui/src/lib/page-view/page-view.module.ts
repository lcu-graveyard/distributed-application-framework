import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import {
	MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
	MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
	MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatLineModule,
	MatListModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatProgressBarModule,
	MatProgressSpinnerModule, MatPseudoCheckboxModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule,
	MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule,
	MatToolbarModule, MatTooltipModule
} from '@angular/material';

import { FathymSharedModule } from '@lcu/hosting';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { PageViewControl } from './page-view.control';
import { DAFUIModule } from '../daf-ui.module';

var materialModules = [
	MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
	MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
	MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatLineModule,
	MatListModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatProgressBarModule,
	MatProgressSpinnerModule, MatPseudoCheckboxModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule,
	MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule,
	MatToolbarModule, MatTooltipModule
];

var thirdPartyModules = [
	...materialModules,
	FlexLayoutModule,
	FormsModule,
	ReactiveFormsModule,
	DndModule,
	MonacoEditorModule,
	AngularFontAwesomeModule,
	DAFUIModule,
];

var comps = [
	PageViewControl
];

@NgModule({
	imports: [
		FathymSharedModule,
		...thirdPartyModules,
	],
	declarations: [
		...comps,
	],
	exports: [
		...thirdPartyModules,
		...comps,
	],
	entryComponents: [
		...comps,
	],	
})
export class PageViewModule {
}
