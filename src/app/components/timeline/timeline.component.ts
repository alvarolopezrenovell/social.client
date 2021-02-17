import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GLOBAL } from "../../services/global";
import { UserService } from "../../services/user.service";
import { PublicationService } from "../../services/publication.service";

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [UserService, PublicationService]
})

export class TimelineComponent implements OnInit {
  public title = 'Timeline';
  public identity;
  public token;
  public url;

  constructor (
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.identity = this._userService.getUserAuth();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    
  }

}
