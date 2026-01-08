import {Component, OnInit} from '@angular/core';
import {LabelComponent} from '../../form/label/label.component';
import {CheckboxComponent} from '../../form/input/checkbox.component';
import {ButtonComponent} from '../../ui/button/button.component';
import {InputFieldComponent} from '../../form/input/input-field.component';
import {Router, RouterModule} from '@angular/router';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from '@angular/forms';
import {AuthService} from "../auth.service";
import {AlertComponent} from "../../ui/alert/alert.component";
import {NgClass, NgIf} from "@angular/common";


@Component({
    selector: 'app-signin-form',
    imports: [
        LabelComponent,
        CheckboxComponent,
        ButtonComponent,
        InputFieldComponent,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AlertComponent,
        NgIf,
        NgClass
    ],
    templateUrl: './signin-form.component.html',
    styles: ``
})


export class SigninFormComponent implements OnInit {

    constructor(protected formBuilder: FormBuilder,
                protected service: AuthService,
                protected router: Router) {
    }

    form!: FormGroup;
    showPassword = false;
    isChecked = false;


    showError = false;
    error = '';

    public get email() {
        return this.form.get('email');
    }

    public get password() {
        return this.form.get('password');
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    onSignIn() {

        if (this.form.invalid){
            this.form.markAllAsTouched();
            return
        }

        this.service.login(this.form.value)
            .subscribe((rs) => {
                localStorage.setItem('authToken', rs?.data?.token)

                this.router.navigateByUrl('/home')
            }, err => {
                console.log(err)
                this.error = err?.error?.message;
                this.showError = true;
            })


    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.form = this.formBuilder
            .group({
                email: [ undefined,[required]],
                password: undefined
            })
    }
}
export function required(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '')
    ) {
        return { required: true };
    }

    return null;
}

