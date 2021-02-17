import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Message } from "../models/message";

@Injectable()

export class MessageService {
  public url: string;
  public message: Message;
  public token: string;
  public stats: JSON;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addMessage(token, message: Message):Observable<any> {
    let params = JSON.stringify(message);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url+'message', params, {headers: headers});
  }

  getConversationInfo(token, user_id):Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url+'message/conversation-info/'+user_id,  {headers: headers});
  }

  getConversation(token, user_id, page = 1):Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url+'message/conversation/'+user_id+'?page='+page+'&length=20',  {headers: headers});
  }

  getConversations(token, page = 1):Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url+'message/conversations/?page='+page,  {headers: headers});
  }

  getMessages(token, page = 1):Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url+'message/received/?page='+page,  {headers: headers});
  }

  getSentMessages(token, page = 1):Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url+'message/emitted/?page='+page,  {headers: headers});
  }

}
