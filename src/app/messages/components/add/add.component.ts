import { Component, OnInit, DoCheck } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../../models/user";
import { Message } from "../../../models/message";
import { UserService } from "../../../services/user.service";
import { MessageService } from "../../../services/message.service";
import { FollowService } from "../../../services/follow.service";
import { GLOBAL} from "../../../services/global";

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, MessageService, FollowService]
})

export class AddComponent implements OnInit {
  public title: string;
  public message: Message;
  public identity: User;
  public token;
  public url;
  public status;
  public follows;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _messageService: MessageService,
    private _followService: FollowService
  ) {
    this.title = 'Nuevo mensaje privado';
    this.url = GLOBAL.url;
    this.identity = this._userService.getUserAuth();
    this.token = this._userService.getToken();
    this.message = new Message('', '', false, '', this.identity._id, '');
    this.getFollows();
  }

  ngOnInit(): void {
    console.log('Componente de <messages.add> cargado');
  }

  onSubmit(form) {
    this._messageService.addMessage(this.token, this.message).subscribe(
      response => {
        if (response.message) {

          form.reset();
          this.status = true;
        } else {
          this.status = false;
        }
      },
      error => {
        this.status = false;
      }
    );
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
