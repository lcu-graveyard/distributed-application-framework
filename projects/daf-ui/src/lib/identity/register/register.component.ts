import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Status } from '@lcu/common';
import { ForgeJSONSchema } from '@lcu/apps';
import { IdentityService, RegisterModel } from '@lcu/identity';
import { PageUIService } from '@lcu/daf-common';
import { BaseResponse, isResultSuccess } from '@lcu/core';
import { RouterHelpersService } from '@lcu/routing';

@Component({
    selector: 'f-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    //  Fields

    //  Properties
    public Errors: string[];

    public Loading: boolean;

    public get Password() {
        return this.RegisterFormGroup.get('password');
    }

    public get PasswordConfirmation() {
        return this.RegisterFormGroup.get('passwordConfirmation');
    }

    @Input('phone-placeholder')
    public PhoneNumberPlaceholder: string;

    public ProfileFormGroup: FormGroup;

    @Output('registered')
    public Registered: EventEmitter<Status> = new EventEmitter<Status>();

    public RegisterFormGroup: FormGroup;

    @Output('error')
    public RegisterError: EventEmitter<Status> = new EventEmitter<Status>();
   
	@Input('register-schema')
	public RegisterSchema: ForgeJSONSchema;

    public get Username() {
        return this.RegisterFormGroup.get('username');
    }

    //  Constructors
    constructor(protected idSvc: IdentityService, protected route: ActivatedRoute, protected formBldr: FormBuilder, 
        protected pgUiSvc: PageUIService, protected routerHelpers: RouterHelpersService) {
        this.PhoneNumberPlaceholder = 'Phone Number';

    }

    //	Life Cycle
    public ngOnInit() {
        this.RegisterFormGroup = this.formBldr.group({
            username: new FormControl('', [Validators.required, Validators.email], ),
            password: ['', (Validators.required, Validators.minLength(8))],
            passwordConfirmation: ['', Validators.required],
            phoneNumber: ['', Validators.required]
        }, { validator: this.passwordConfirming });

        this.routerHelpers.RunOnQueryParam('username', (params: any) => {
            this.RegisterFormGroup.get('username').setValue(decodeURIComponent(params['username']));
        });
    }

    //	API Methods
    public HandleRegister() {
        this.Loading = true;

        this.Errors = null;

        var register = this.buildRegisterModelFromForm();

        this.idSvc.Register(register)
            .subscribe((result: BaseResponse) => {
                if (isResultSuccess(result)) {
                    this.Registered.emit(result.Status);

                    this.OnRegistered(result.Status);
                } else {
                    console.log(result);

                    this.Errors = (<any>result.Status).Errors || [result.Status.Message];

                    this.Loading = false;

                    this.RegisterError.emit(result.Status);
                }
            },
                (error: any) => {
                    this.handleUnkownError(error);
                });
    }

    public IsRegistered() {
        this.Loading = true;

        this.Errors = null;

        var register = this.buildRegisterModelFromForm();

        this.idSvc.IsRegistered(register)
            .subscribe((result: BaseResponse) => {
                if (isResultSuccess(result)) {
                    this.Loading = false;
                } else {
                    console.log(result);

                    this.Errors = (<any>result.Status).Errors || [result.Status.Message];

                    this.Loading = false;

                    this.RegisterError.emit(result.Status);
                }
            },
                (error: any) => {
                    this.handleUnkownError(error);

                    this.Loading = false;
                });
    }

    public OnRegistered(status: Status) {
        this.pgUiSvc.Notify.Signal("Registration Successful, redirecting to The Forge", 5000);
    }

    //	Helpers
    protected buildRegisterModelFromForm(): RegisterModel {
        return {
            Username: this.RegisterFormGroup.get('username').value,
            Password: this.RegisterFormGroup.get('password').value,
            Profile: {
                PhoneNumber: this.RegisterFormGroup.get('phoneNumber').value
            },
            ProfileType: 'Forge'
        };
    } 

    protected handleUnkownError(error: any) {
        console.log(error);

        var err = <any>{ HTTPError: error };

        var errStatus = <Status>err;

        errStatus.Code = 1;

        errStatus.Message = 'There was an unknown issue.  Please try again and contact support if the problem continues.';

        this.RegisterError.emit(<Status>errStatus);

        this.Errors = [errStatus.Message];

        this.Loading = false;
    }

    protected passwordConfirming(c: AbstractControl): { invalid: boolean } {
        if (c.get('password').value !== c.get('passwordConfirmation').value) {
            c.get('passwordConfirmation').setErrors({ 'noMatch': true });

            return { invalid: true };
        }
    }


}
