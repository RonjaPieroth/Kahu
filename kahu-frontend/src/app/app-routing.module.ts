import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './before-login/start-page/start-page.component';
import {LoginFormComponent} from './before-login/login-form/login-form.component';
import {SignupFormComponent} from './before-login/signup-form/signup-form.component';
import {SwipePageComponent} from './future-pet-owner-profile/swipe-page/swipe-page.component';
import {MatchesComponent} from './future-pet-owner-profile/matches/matches.component';
import {PetOwnerMailboxComponent} from './future-pet-owner-profile/pet-owner-mailbox/pet-owner-mailbox.component';
import {NotificationsComponent} from './future-pet-owner-profile/notifications/notifications.component';
import {OwnerProfilFormComponent} from './future-pet-owner-profile/owner-profil-form/owner-profil-form.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {ShelterFormComponent} from './shelter-profile/shelter-form/shelter-form.component';
import {PetOverviewComponent} from './shelter-profile/pets/pet-overview/pet-overview.component';
import {PetFormComponent} from './shelter-profile/pets/pet-form/pet-form.component';
import {PetProfileComponent} from './shelter-profile/pets/pet-profile/pet-profile.component';
import {ProfilePageShelterComponent} from './shelter-profile/profile-page-shelter/profile-page-shelter.component';

const routes: Routes = [
  {path: "", component: StartPageComponent},
  {path: "login", component: LoginFormComponent},
  {path: "sign-up", component: SignupFormComponent},
  {path: "profile", component: ProfilePageComponent},
  {path: "profile/pet/:id", component: PetProfileComponent},
  {path: "profile/shelter/:id", component: ProfilePageShelterComponent},
  {path: "swipe", component: SwipePageComponent},
  {path: "matches", component: MatchesComponent},
  {path: "mailbox", component: PetOwnerMailboxComponent},
  {path: "mailbox/:userId", component: PetOwnerMailboxComponent},
  {path: "mailbox/:userId/ :petID", component: PetOwnerMailboxComponent},
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
