import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Login} from '../../models/login';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {

  signUpForm: FormGroup = new FormGroup(
    {
      mail: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl("", Validators.required)
    }
  )

  get passwordsMatch(): boolean {
    const inputPassword = this.signUpForm.get("password")?.value;
    const inputConfirmPassword = this.signUpForm.get("confirmPassword")?.value;
    return inputPassword === inputConfirmPassword;
  }

  onSubmit(): void {
    const loginObject: Login = {
      mail: this.signUpForm.get("mail")?.value,
      password: this.signUpForm.get("password")?.value
    };
    console.log(loginObject);
  }
}
