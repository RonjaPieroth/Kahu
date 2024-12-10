import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './before-login/start-page/start-page.component';
import { ProfilePageComponent } from './future-pet-owner-profile/profile-page/profile-page.component';
import { PetFormComponent } from './shelter-profile/pet-form/pet-form.component';
import { MailBoxComponent } from './shelter-profile/mail-box/mail-box.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginFormComponent } from './before-login/login-form/login-form.component';
import { SignupFormComponent } from './before-login/signup-form/signup-form.component';
import { ProfilePageShelterComponent } from './shelter-profile/profile-page-shelter/profile-page-shelter.component';
import {ReactiveFormsModule} from "@angular/forms";
import { OwnerProfilFormComponent } from './future-pet-owner-profile/owner-profil-form/owner-profil-form.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    ProfilePageComponent,
    PetFormComponent,
    MailBoxComponent,
    NavbarComponent,
    FooterComponent,
    LoginFormComponent,
    SignupFormComponent,
    ProfilePageShelterComponent,
    OwnerProfilFormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
