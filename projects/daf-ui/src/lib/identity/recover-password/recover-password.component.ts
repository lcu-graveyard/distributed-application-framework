import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPasswordRecoveryModel, IdentityService, RecoverPasswordModel } from '@lcu/identity';
import { Status } from '@lcu/common';
import { RouterHelpersService } from '@lcu/routing';
import { BaseResponse, isResultSuccess } from '@lcu/core';
import { PageUIService } from '@lcu/daf-common';

@Component({
    selector: 'f-recover-password',
    templateUrl: './recover-password.component.html',
    styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
    //  Fields

    //  Properties
    public Errors: string[];

    public IsCodeSent: boolean;

    public Loading: boolean;

    public get Password() {
        return this.ConfirmPasswordRecoveryFormGroup.get('password');
    }

    public get PasswordConfirmation() {
        return this.ConfirmPasswordRecoveryFormGroup.get('confirmPassword');
    }

    public model: ConfirmPasswordRecoveryModel;

    public ProfileFormGroup: FormGroup;

    public RecoverPasswordFormGroup: FormGroup;

    public ConfirmPasswordRecoveryFormGroup: FormGroup;

    @Output('recovered-password')
    public RecoveredPassword: EventEmitter<Status> = new EventEmitter<Status>();

    @Output('error')
    public RecoverPasswordError: EventEmitter<Status> = new EventEmitter<Status>();

    public get Username() {
        return this.RecoverPasswordFormGroup.get('email');
    }

    //  Constructors
    constructor(protected idSvc: IdentityService, protected route: ActivatedRoute, protected formBldr: FormBuilder, 
        protected pgUiSvc: PageUIService, protected routerHelpers: RouterHelpersService) {
    }

    //	Life Cycle
    public ngOnInit() {

        this.RecoverPasswordFormGroup = this.formBldr.group({
            email: new FormControl('', [Validators.required, Validators.email], ),
        });

        this.ConfirmPasswordRecoveryFormGroup = this.formBldr.group({
            code: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        }, { validator: this.passwordConfirming });

        this.routerHelpers.RunOnQueryParam("code", (params) => {
            this.ConfirmPasswordRecoveryFormGroup.patchValue({
                code: params.code,
                email: params.email,
            });

            this.IsCodeSent = true;
        });
    }

    //	API Methods
    public HandleRecoverPassword() {
        this.Loading = true;

        this.Errors = null;

        var recoverPassword = this.buildPasswordRecoverModelFromForm();

        this.idSvc.RecoverPassword(recoverPassword)
            .subscribe((result: BaseResponse) => { 
                if (isResultSuccess(result)) {

                    this.OnRecovered(result.Status);

                    this.IsCodeSent = true;

                    this.ConfirmPasswordRecoveryFormGroup.patchValue({
                        email: recoverPassword.Email,
                    });

                    this.Loading = false;

                } else {
                    console.log(result);

                    this.Errors = (<any>result.Status).Errors || [result.Status.Message];

                    this.Loading = false;

                    this.RecoverPasswordError.emit(result.Status);
                }
            },
                (error: any) => {
                    this.handleUnkownError(error);
                });
    }

    public HandleConfirmPasswordRecovery() {
        this.Loading = true;

        this.Errors = null;

        var confirmPasswordRecovery = this.buildConfirmPasswordRecoveryModelFromForm();

        this.idSvc.ConfirmPasswordRecovery(confirmPasswordRecovery)
            .subscribe((result: BaseResponse) => {
                if (isResultSuccess(result)) {
                    this.OnReset(result.Status);

                    this.Loading = false;
                } else {
                    console.log(result);

                    this.Errors = (<any>result.Status).Errors || [result.Status.Message];

                    this.Loading = false;

                    this.RecoverPasswordError.emit(result.Status);
                }
            },
                (error: any) => {
                    this.handleUnkownError(error);

                    this.Loading = false;
                });
    }

    public OnRecovered(status: Status) {
        this.pgUiSvc.Notify.Signal("Recovery Email Sent, please allow a few minutes for email to arrive.", 7000);
    }

    public OnReset(status: Status) {
        this.pgUiSvc.Notify.Signal("Password reset successfully", 7000);
    }

    //	Helpers
    protected buildConfirmPasswordRecoveryModelFromForm(): ConfirmPasswordRecoveryModel {
        return {
            Email: this.ConfirmPasswordRecoveryFormGroup.get('email').value,
            Code: this.ConfirmPasswordRecoveryFormGroup.get('code').value,
            ConfirmPassword: this.ConfirmPasswordRecoveryFormGroup.get('confirmPassword').value,
            Password: this.ConfirmPasswordRecoveryFormGroup.get('password').value,
        };
    }

    protected buildPasswordRecoverModelFromForm(): RecoverPasswordModel {
        return {
            Email: this.RecoverPasswordFormGroup.get('email').value,
        };
    }

    protected handleUnkownError(error: any) {
        console.log(error);

        var err = <any>{ HTTPError: error };

        var errStatus = <Status>err;

        errStatus.Code = 1;

        errStatus.Message = 'There was an unknown issue.  Please try again and contact support if the problem continues.';

        this.RecoverPasswordError.emit(<Status>errStatus);

        this.Errors = [errStatus.Message];

        this.Loading = false;
    }

    protected passwordConfirming(c: AbstractControl): { invalid: boolean } {
        if (c.get('password').value !== c.get('confirmPassword').value) {
            c.get('confirmPassword').setErrors({ 'noMatch': true });

            return { invalid: true };
        }
    }


}
