import { Component, OnInit } from "@angular/core";
import { Observable, Subscription, interval  } from 'rxjs';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../../models/user";
import { Message } from "../../../models/message";
import { UserService } from "../../../services/user.service";
import { MessageService } from "../../../services/message.service";
import { FollowService } from "../../../services/follow.service";
import { GLOBAL} from "../../../services/global";
import $ from "jquery";

@Component({
  selector: 'conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  providers: [UserService, MessageService, FollowService]
})

export class ConversationComponent implements OnInit {
  public identity: User;
  public token;
  public url;
  public messages: Message[];
  public user: User;
  public status;
  public message: Message;
  public today;
  public firstLoad = true;
  public lastElement;
  public page = 1;
  public pages = 0;
  public enableRefresh = false;
  private updateSubscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _messageService: MessageService,
  ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getUserAuth();
    this.token = this._userService.getToken();
    this.today = new Date;
    this.getUser();
  }

  ngOnInit(): void {
    console.log('Componente de <messages.conversation> cargado');
    this.updateSubscription = interval(2000).subscribe(
      (val) => {
        if (this.enableRefresh) {
          this.page = 1;
          this.getMessages();
        }
      }
    );
  }

  getUser() {
    this._route.params.subscribe(
      params => {
        let user_id = params['user_id'];
        this._userService.getUser(user_id).subscribe(
          response => {
            if (response.user) {
              this.page = 1;
              this.user = response.user;
              this.message = new Message('', '', false, '', this.identity._id, this.user._id);
              this.getMessages();
            }
          }
        );
      }
    );
  }

  getMessages(adding = null) {
    this._messageService.getConversation(this.token, this.user._id, this.page).subscribe(
      response => {
        if (response.messages) {

          this.pages = response.pages;

          if (!adding) {
            this.messages = response.messages.reverse();
            this.scrollToBottom();
          } else {
            this.firstLoad = false;
            var messages = this.messages;
            var newMessages = response.messages.reverse();
            this.messages = newMessages.concat(messages);
            this.scrollToElement();
          }

        }
      }
    );
  }

  onSubmit(form) {
    this._messageService.addMessage(this.token, this.message).subscribe(
      response => {
        if (response.message) {
          this.page = 1;
          this.getMessages();
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

  autoGrow(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25)+"px";
  }

  onScroll(event) {
    if (event.target.scrollTop < 10) {
      if (this.page < this.pages) {
        this.lastElement = $('.message_text').first();
        this.page++;
        this.getMessages(true);
      }
    }

    this.enableRefresh = (event.target.scrollHeight - event.target.scrollTop) === event.target.offsetHeight;
  }

  scrollToElement() {
    var lastElement = this.lastElement;
    document.getElementById($(lastElement).attr('id')).scrollIntoView();
    document.getElementById("conversation_wrapper").scrollTop -= 30;
  }

  scrollToBottom() {
    document.getElementById("conversation_wrapper").scrollTop = document.getElementById("conversation_wrapper").scrollHeight;
  }

}
