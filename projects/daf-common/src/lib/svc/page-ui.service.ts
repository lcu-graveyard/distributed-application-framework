import { Injectable } from '@angular/core';
import { MatSidenav, MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { BaseModeledResponse } from '@lcu/core';

//	TODO Rename to ForgeUIService
@Injectable({
	providedIn: 'root'
})
export class PageUIService {
	//	Fields
	protected sideNav: MatSidenav;

	//	Constructors
	constructor(protected dialog: MatDialog, public snackBar: MatSnackBar) {
	}

	//	API Methods
	public Dialog = {
		Open: (dialogType: ComponentType<any>, data: any, handleClosed: (value: BaseModeledResponse<any>) => void = null, width: string = null) => {
			var dialogRef = this.dialog.open(dialogType, {
				width: width || '300px',
				data: data
			});

			if (handleClosed)
				dialogRef.afterClosed().subscribe((res) => handleClosed(res));

			return dialogRef;
		}
	};

	public Notify = {
		Open: (message: string, action?: any, handleClosed?: (dismissedMyAction: boolean) => void, options?: MatSnackBarConfig) => {
			var snackBarRef = this.snackBar.open(message, action, options);

			if (handleClosed)
				snackBarRef.afterDismissed().subscribe((res) => handleClosed(res.dismissedByAction));

			return snackBarRef;
		},
		Signal: (message: string, duration: number = 2750) => {
			return this.snackBar.open(message, null, {
				duration: duration,
			});
		}
	};

	public SideNav = {
		Close: () => {
			if (this.sideNav)
				this.sideNav.close();
		},
		Open: () => {
			if (this.sideNav)
				this.sideNav.open();
		},
		Set: (sideNav: MatSidenav) => {
			this.sideNav = sideNav;
		},
		Toggle: () => {
			if (this.sideNav)
				this.sideNav.toggle();
		}
	};
}
