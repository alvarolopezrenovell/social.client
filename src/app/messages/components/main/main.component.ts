import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { FollowService } from "../../../services/follow.service";
import { MessageService } from "../../../services/message.service";
import { User } from "../../../models/user";
import {GLOBAL} from "../../../services/global";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [FollowService, MessageService]
})

export class MainComponent implements OnInit {
  public title = 'Mensajes';
  public url;
  public identity: User;
  public token;
  public follows;

  constructor(
    private _userService: UserService,
    private _followService: FollowService,
  ) {
    this.identity = this._userService.getUserAuth();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.getFollows();
  }

  ngOnInit(): void {
    console.log('Componente de <messages.main> cargado');
  }

  getFollows() {
    this._followService.getFollowed(this.token, this.identity._id).subscribe(
      response => {
        if (response.follows) {
          this.follows = response.follows;
        }
      }
    );
  }

}
