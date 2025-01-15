import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './before-login/start-page/start-page.component';
import {LoginFormComponent} from './before-login/login-form/login-form.component';
import {SignupFormComponent} from './before-login/signup-form/signup-form.component';
import {SwipePageComponent} from './future-pet-owner-profile/swipe-page/swipe-page.component';
import {MatchesComponent} from './future-pet-owner-profile/matches/matches.component';
import {NotificationsComponent} from './future-pet-owner-profile/notifications/notifications.component';
import {OwnerProfilFormComponent} from './future-pet-owner-profile/owner-profil-form/owner-profil-form.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {ShelterFormComponent} from './shelter-profile/shelter-form/shelter-form.component';
import {PetOverviewComponent} from './shelter-profile/pets/pet-overview/pet-overview.component';
import {PetFormComponent} from './shelter-profile/pets/pet-form/pet-form.component';
import {PetProfileComponent} from './shelter-profile/pets/pet-profile/pet-profile.component';
import {ProfilePageShelterComponent} from './shelter-profile/profile-page-shelter/profile-page-shelter.component';
import {
  ProfilePagePetOwnerComponent
} from './future-pet-owner-profile/profile-page-pet-owner/profile-page-pet-owner.component';
import {ChatComponent} from './mailbox/chat/chat.component';
import {MailboxComponent} from './mailbox/mailbox.component';
import {ChatElementComponent} from './mailbox/chat-element/chat-element.component';
import {ChatOverviewComponent} from './mailbox/chat-overview/chat-overview.component';

const routes: Routes = [
  {path: "", component: StartPageComponent},
  {path: "login", component: LoginFormComponent},
  {path: "sign-up", component: SignupFormComponent},
  {path: "profile", component: ProfilePageComponent},
  {path: "profile/pet/:id", component: PetProfileComponent},
  {path: "profile/shelter/:id", component: ProfilePageShelterComponent},
  {path: "profile/kahu/:id", component: ProfilePagePetOwnerComponent},
  {path: "swipe", component: SwipePageComponent},
  {path: "matches", component: MatchesComponent},
  {path: "mailbox", component: MailboxComponent},
  {path: "mailbox/:channelId", component: ChatElementComponent},
  {path: "notifications", component: NotificationsComponent},
  {path: "owner-profile-form", component: OwnerProfilFormComponent},
  {path: "shelter-profile-form", component: ShelterFormComponent},
  {path: "pets", component: PetOverviewComponent},
  {path: "pet/modify/:id", component: PetFormComponent},
  {path: "pet/new", component: PetFormComponent}
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
