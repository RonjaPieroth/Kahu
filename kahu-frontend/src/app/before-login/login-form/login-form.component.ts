import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Login} from '../../models/login';
import {Router} from '@angular/router';
import {NavbarService} from '../../services/navbar.service';

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

  constructor(private loginService: LoginService, private router: Router, private navbarService: NavbarService) {
  }

  submitLogin(): void {
    this.loginService.login(this.loginForm.value).subscribe(data => {
      localStorage.setItem('token', JSON.stringify(data.token));
      this.navbarService.updateNavbar();
      this.router.navigate([""]);
    });
  }

}
