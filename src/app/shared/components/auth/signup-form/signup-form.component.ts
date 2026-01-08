
import {Component, OnInit} from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { CheckboxComponent } from '../../form/input/checkbox.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import {Router, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-signup-form',
  imports: [
    LabelComponent,
    CheckboxComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup-form.component.html',
  styles: ``
})
export class SignupFormComponent implements OnInit{


  constructor(protected formBuilder: FormBuilder,
              protected service: AuthService,
              protected router: Router) {
  }

  ngOnInit(): void {
        this.buildForm();
    }

  form! : FormGroup ;

  showPassword = false;
  isChecked = false;

  fname = '';
  lname = '';
  email = '';
  password = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private createReqBody(): any{
      return {
          "email": this.form.get('email')?.value,
          "firstName": this.form.get('fName')?.value,
          "lastName": this.form.get('lName')?.value,
          "password":this.form.get('password')?.value,
          "role": ["USER", "ADMIN"],
          "phoneNumber": "+9779812345678",
          "serverCompressor": true
      }

  }

  onSignIn() {
    console.log(this.form.value)
    this.service.registerUser(this.createReqBody())
        .subscribe((rs)=>{
          console.log(rs)
            this.router.navigateByUrl('/signin')
        })
  }

  buildForm(): void{
    this.form = this.formBuilder
        .group({
          fName: undefined,
          lName: undefined,
          email: undefined,
          password: undefined
        })
  }
}
