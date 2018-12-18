import { NgModule } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { DisplayComponentComponent } from './display-component.component';

@NgModule({
	imports: [
		FathymSharedModule,
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
export class GenericDomainModule { 
}
