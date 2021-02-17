import {Component, OnInit, Input } from "@angular/core";
import { Observable, Subscription, interval  } from 'rxjs';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import { MessageService } from "../../../services/message.service";
import { GLOBAL } from "../../../services/global";
import { Message } from "../../../models/message";

@Component({
  selector: 'user-conversation',
  templateUrl: './user-conversation.component.html',
  styleUrls: ['./user-conversation.component.css'],
  providers: [UserService, MessageService]
})

export class UserConversationComponent implements OnInit {
  public identity: User;
  public token;
  public url;
  public user: User;
  public last_message: Message;
  public num_messages_unviewed;
  private updateSubscription: Subscription;

  @Input() user_id;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _messageService: MessageService,
  ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getUserAuth();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    console.log('Componente de <messages.user-conversation> cargado');
    this.getUser();
    this.updateSubscription = interval(2000).subscribe(
      (val) => { this.getConversationInfo(); }
      );
  }

  getUser() {
    this._userService.getUser(this.user_id).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;
          this.getConversationInfo();
        }
      }
    );
  }

  getConversationInfo() {
    this._messageService.getConversationInfo(this.token, this.user._id).subscribe(
      response => {
        this.last_message = response.last_message;
        this.num_messages_unviewed = response.num_messages_unviewed;
      }
    );
  }

}
