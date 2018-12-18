import { NgModule } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { ControlBuilderDialog } from './control-builder.dialog';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DisplayComponentModule } from '../display-component/display-component.module';

@NgModule({
	imports: [
		FathymSharedModule,
		DisplayComponentModule,
		MatButtonModule,
		MatDialogModule,
	],
	declarations: [
		ControlBuilderDialog,
	],
	exports: [
		ControlBuilderDialog,
	],
	entryComponents: [
		ControlBuilderDialog,
	]
})
export class ControlBuilderModule { 
}
