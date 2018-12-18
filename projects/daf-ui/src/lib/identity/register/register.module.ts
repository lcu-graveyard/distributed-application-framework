import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatStepperModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout'

import { FathymSharedModule } from '@lcu/hosting';

import { RegisterComponent } from './register.component';

@NgModule({
	imports: [
		FathymSharedModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatStepperModule,
	],
	declarations: [
		RegisterComponent
	],
	exports: [
		RegisterComponent
	]
})
export class ForgeRegisterModule {
}
