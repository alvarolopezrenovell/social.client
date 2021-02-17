import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { User } from "../models/user";
import { Follow } from "../models/follow";

@Injectable()

export class FollowService {
  public url: string;
  public user: User;
  public token: string;
  public stats: JSON;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getFollowed(token, user_id, page = 1): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url+'user/followers/'+user_id+'/?page='+page,  {headers: headers});
  }

  getFollowing(token, user_id, page = 1): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url+'user/following/'+user_id+'/?page='+page,  {headers: headers});
  }

  follow(followed, token): Observable<any> {
    let params = { id: followed };
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url+'user/follow', params, {headers: headers});
  }

  unfollow(userId, token): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.delete(this.url+'user/follow/'+userId, {headers: headers});
  }

}
