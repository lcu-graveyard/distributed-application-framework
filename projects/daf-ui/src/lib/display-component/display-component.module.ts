import { NgModule } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { DisplayComponentComponent } from './display-component.component';
import { DisplayModule } from '../display/display.module';

@NgModule({
	imports: [
		FathymSharedModule,
		DisplayModule,
	],
	declarations: [
		DisplayComponentComponent,
	],
	exports: [
		DisplayComponentComponent,
	],
	entryComponents: [
		DisplayComponentComponent,
	]
})
export class DisplayComponentModule { 
}
