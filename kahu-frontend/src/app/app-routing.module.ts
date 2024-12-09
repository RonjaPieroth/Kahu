import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './before-login/start-page/start-page.component';
import {LoginFormComponent} from './before-login/login-form/login-form.component';
import {SignupFormComponent} from './before-login/signup-form/signup-form.component';

const routes: Routes = [
  {path: "", component: StartPageComponent},
  {path: "login", component: LoginFormComponent},
  {path: "create-profile", component: SignupFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
