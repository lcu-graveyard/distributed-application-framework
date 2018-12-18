import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatStepperModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout'

import { FathymSharedModule } from '@lcu/hosting';

import { RecoverPasswordComponent } from './recover-password.component';

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
		RecoverPasswordComponent
	],
	exports: [
        RecoverPasswordComponent
	]
})
export class ForgeRecoverPasswordModule {
}
