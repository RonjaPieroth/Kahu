import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Login} from '../../models/login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  loginInvalid?: boolean;

  loginForm: FormGroup = new FormGroup(
    {
      mail: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    }
  )

  constructor(private loginService: LoginService) {
  }

  submitLogin(): boolean{
    const loginObject: Login = this.loginForm.value;
    return this.loginService.checkLogin(loginObject);
  }

}
