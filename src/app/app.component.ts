import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "./services/user.service";
import { User } from "./models/user";
import { GLOBAL } from "./services/global";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService
  ]
})
export class AppComponent {
  public title: string;
  public user: User;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Social';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.user = this._userService.getUserAuth();
  }

  ngDoCheck() {
    this.user = this._userService.getUserAuth();
  }

  logout() {
    this.user = null;
    localStorage.clear();
    this._router.navigate(['']);
  }

}
