import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ExploreComponent } from "./components/explore/explore.component";

import {UserGuard} from "./services/user.guard";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'acceso', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },

  { path: 'timeline', component: TimelineComponent, canActivate: [UserGuard] },
  { path: 'mis-datos', component: UserEditComponent, canActivate: [UserGuard] },
  { path: 'explorar', component: ExploreComponent, canActivate: [UserGuard] },
  { path: 'perfil/:id', component: ProfileComponent, canActivate: [UserGuard] },
  { path: 'perfil/:id/:section', component: ProfileComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
