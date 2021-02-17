// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MomentModule } from "angular2-moment";

// Routes
import { MessagesRoutingModule } from "./messages-routing.module";

// Components
import { MainComponent } from "./components/main/main.component";
import { AddComponent } from "./components/add/add.component";
import { ConversationComponent } from "./components/conversation/conversation.component";
import { UserConversationComponent } from "./components/user-conversation/user-conversation.component";

// Services
import {UserService} from "../services/user.service";
import {UserGuard} from "../services/user.guard";

@NgModule({
  declarations: [
    MainComponent,
    AddComponent,
    ConversationComponent,
    UserConversationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    MessagesRoutingModule,
  ],
  exports: [
    MainComponent,
    AddComponent,
    ConversationComponent,
  ],
  providers: [
    UserService,
    UserGuard
  ],
})
export class MessagesModule { }
