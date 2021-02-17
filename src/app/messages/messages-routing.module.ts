import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from "./components/main/main.component";
import { AddComponent } from "./components/add/add.component";
import { ConversationComponent } from "./components/conversation/conversation.component";

import {UserGuard} from "../services/user.guard";

const messagesRoutes: Routes = [
  {
    path: 'mensajes',
    component: MainComponent,
    canActivate: [UserGuard],
    children: [
      { path: 'enviar' , component: AddComponent, canActivate: [UserGuard] },
      { path: ':user_id' , component: ConversationComponent, canActivate: [UserGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(messagesRoutes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
