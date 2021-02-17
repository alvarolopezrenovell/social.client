import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MomentModule } from "angular2-moment";

// Modules
import { MessagesModule } from "./messages/messages.module";

// Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { ExploreComponent } from "./components/explore/explore.component";
import { UsersComponent } from "./components/users/users.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { PublicationsComponent } from "./components/publications/publications.component";
import { ProfileComponent } from "./components/profile/profile.component";

// Services
import {UserService} from "./services/user.service";
import {UserGuard} from "./services/user.guard";

// Locale

import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    ExploreComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    MessagesModule,
  ],
  providers: [
    UserService,
    UserGuard,
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
