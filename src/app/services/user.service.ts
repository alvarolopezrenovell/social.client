import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { User } from "../models/user";

@Injectable()

export class UserService {
  public url: string;
  public user: User;
  public token: string;
  public stats: JSON;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'user/register', params, {headers: headers});
  }

  login(user: User): Observable<any> {
    let params = {
      email: user.email,
      password: user.password,
    };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'user/login', params, {headers: headers});
  }

  getCounters(userId = null): Observable<any> {
    let headers = new HttpHeaders()
                  .set('Content-Type', 'application/json')
                  .set('Authorization', this.getToken());

    let url = this.url+'user/counters';
    if (userId != null) {
      url = url+'/'+userId;
    }

    return this._http.get(url, {headers: headers});
  }

  update(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    return this._http.put(this.url+'user/update/'+user._id, params, {headers: headers});
  }

  getUser(userId): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    let url = this.url+'user/'+userId;

    return this._http.get(url, {headers: headers});
  }

  getUsers(userId = null, page = null): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    let url = this.url+'user/list';

    if (userId != null) {
      url += '/'+userId;
    }

    if (page != null) {
      url += '?page='+page;
    }

    return this._http.get(url, {headers: headers});
  }

  // Local Storage

  setUserAuth(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserAuth() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (typeof user == 'undefined') { user = null; }
    this.user = user;
    return this.user;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (typeof token == 'undefined') { token = null; }
    this.token = token;
    return this.token;
  }

  setStats(stats: JSON) {
    this.stats = stats;
    localStorage.setItem('stats', JSON.stringify(stats));
  }

  getStats() {
    let stats = JSON.parse(localStorage.getItem('stats'));
    if (typeof stats == 'undefined') { stats = null; }
    this.stats = stats;
    return this.stats;
  }

}
