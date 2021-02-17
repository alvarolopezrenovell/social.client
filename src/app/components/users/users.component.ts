import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { FollowService } from "../../services/follow.service";
import { User } from "../../models/user";
import { GLOBAL} from "../../services/global";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [
    UserService,
    FollowService,
  ]
})

export class UsersComponent implements OnInit {
  public title: string;
  public userAuth: User;
  public token: string;
  public url: string;
  public page;
  public nextPage;
  public prevPage;
  public status: boolean;
  public message: string;
  public total;
  public pages;
  public users: Array<User>;
  public users_following;
  public users_followed;
  public followUserOver;

  @Input() user_id = null;
  @Input() list_type = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.userAuth = this._userService.getUserAuth();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    console.log('Componente <users> cargado');
    this.getActualPage();
  }

  goToPage(page = 1) {
    var url = this._router.url;
    url = url.split('?')[0];
    this._router.navigate([url], { queryParams: { page: page } });
  }

  getActualPage() {
    this._route.queryParams.subscribe(params => {
      let page = +params['page'];
      if (!page) {
        page = 1;
      }

      this.page = page;
      this.nextPage = page + 1;
      this.prevPage = page - 1;

      if (this.prevPage < 1) {
        this.prevPage = 1;
      }

      this.getUsers();
    });
  }

  getUsers() {
    if (this.list_type === 'followed' && this.user_id !== null) {

      this._followService.getFollowed(this.token, this.user_id, this.page).subscribe(
        response => { this.processUsers(response); },
        error => { this.processError(error); }
      );

    } else if (this.list_type === 'following' && this.user_id !== null) {

      this._followService.getFollowing(this.token, this.user_id, this.page).subscribe(
        response => { this.processUsers(response); },
        error => { this.processError(error); }
      );

    } else {

      this._userService.getUsers(null, this.page).subscribe(
        response => { this.processUsers(response); },
        error => { this.processError(error); }
      );

    }
  }

  processUsers(response) {
    if (response.users || response.follows) {
      this.status = true;

      if (response.users) {
        this.users = response.users;
      } else if (response.follows) {
        this.users = [];
        for (let i in response.follows) {
          var follow = response.follows[i];
          if (typeof follow.user === 'object') {
            this.users.push(follow.user);
          } else if (typeof follow.followed === 'object') {
            this.users.push(follow.followed);
          }
        }
      }

      this.total = response.total;
      this.pages = response.pages;
      this.users_following = response.users_following;
      this.users_followed = response.users_followed;

      if (this.page > this.pages) {
        this.goToPage();
      }
    } else {
      this.status = false;
    }
  }

  processError(error) {
    this.status = false;
    this.message = <any>error;
  }

  follow(followed) {
    this._followService.follow(followed, this.token).subscribe(
      response => {
        if (response.follow) {
          this.status = true;
          this.users_following.push(followed);
        } else {
          this.status = false;
          this.message = 'Error al seguir al usuario';
        }
      },
      error => {
        this.status = false;
        this.message = <any>error;
      }
    );
  }

  unfollow(followed) {
    this._followService.unfollow(followed, this.token).subscribe(
      response => {
        if (response.message == "Unfollowed") {
          this.status = true;
          let search = this.users_following.indexOf(followed);
          if (search != -1) {
            this.users_following.splice(search, 1);
          }
        } else {
          this.status = false;
          this.message = 'Error al dejar de seguir al usuario';
        }
      },
      error => {
        this.status = false;
        this.message = <any>error;
      }
    );;
  }

  mouseEnter(userId) {
    this.followUserOver = userId;
  }

  mouseLeave() {
    this.followUserOver = 0;
  }

}


