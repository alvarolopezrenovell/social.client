import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GLOBAL } from "../../services/global";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})

export class ProfileComponent implements OnInit {
  public title: string;
  public identity: User;
  public user_id = null;
  public token;
  public url;
  public section;
  public sections = {
    'publicaciones': 'publications',
    'seguidores': 'followed',
    'seguidos': 'following',
  };

  constructor (
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) {
    this.title = 'Perfil';
    this.identity = this._userService.getUserAuth();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    this._route.params.subscribe(
      params => {
        var section_keys = Object.keys(this.sections);

        this.user_id = params['id'];

        if (typeof params.section !== 'undefined' && section_keys.indexOf(params['section']) !== -1) {
          this.section = this.sections[params['section']];
        } else {
          this.section = this.sections['publicaciones'];
        }

      }
    );
  }

}
