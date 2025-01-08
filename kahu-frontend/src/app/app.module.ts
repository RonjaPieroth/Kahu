import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './before-login/start-page/start-page.component';
import { ProfilePagePetOwnerComponent } from './future-pet-owner-profile/profile-page-pet-owner/profile-page-pet-owner.component';
import { PetFormComponent } from './shelter-profile/pets/pet-form/pet-form.component';
import { MailBoxComponent } from './shelter-profile/mail-box/mail-box.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginFormComponent } from './before-login/login-form/login-form.component';
import { SignupFormComponent } from './before-login/signup-form/signup-form.component';
import { ProfilePageShelterComponent } from './shelter-profile/profile-page-shelter/profile-page-shelter.component';
import {ReactiveFormsModule} from "@angular/forms";
import { OwnerProfilFormComponent } from './future-pet-owner-profile/owner-profil-form/owner-profil-form.component';
import {HttpClientModule} from '@angular/common/http';
import {NgOptimizedImage} from '@angular/common';
import { PetOwnerMailboxComponent } from './future-pet-owner-profile/pet-owner-mailbox/pet-owner-mailbox.component';
import { MessageFormComponent } from './future-pet-owner-profile/message-form/message-form.component';
import { DashboardComponent } from './future-pet-owner-profile/dashboard/dashboard.component';
import { MatchesComponent } from './future-pet-owner-profile/matches/matches.component';
import { SwipePageComponent } from './future-pet-owner-profile/swipe-page/swipe-page.component';
import { NotificationsComponent } from './future-pet-owner-profile/notifications/notifications.component';
import { ShelterFormComponent } from './shelter-profile/shelter-form/shelter-form.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import { PetOverviewComponent } from './shelter-profile/pets/pet-overview/pet-overview.component';
import { PetProfileComponent } from './shelter-profile/pets/pet-profile/pet-profile.component';
import { MatchElementComponent } from './future-pet-owner-profile/swipe-page/match-element/match-element.component';
import {StreamAutocompleteTextareaModule, StreamChatModule} from 'stream-chat-angular';
import {TranslateModule} from '@ngx-translate/core';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    ProfilePagePetOwnerComponent,
    PetFormComponent,
    MailBoxComponent,
    NavbarComponent,
    FooterComponent,
    LoginFormComponent,
    SignupFormComponent,
    ProfilePageShelterComponent,
    OwnerProfilFormComponent,
    PetOwnerMailboxComponent,
    MessageFormComponent,
    DashboardComponent,
    MatchesComponent,
    SwipePageComponent,
    NotificationsComponent,
    ShelterFormComponent,
    CreateProfileComponent,
    ProfilePageComponent,
    PetOverviewComponent,
    PetProfileComponent,
    MatchElementComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    StreamAutocompleteTextareaModule,
    TranslateModule.forRoot(),
    StreamChatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
