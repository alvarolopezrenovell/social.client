import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { User } from "../models/user";
import { Publication } from "../models/publication";

@Injectable()

export class PublicationService {
  public url: string;
  public user: User;
  public token: string;
  public stats: JSON;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addPublication(token, publication: Publication):Observable<any> {
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url+'publication', params, {headers: headers});
  }

  deletePublication(token, id):Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.delete(this.url+'publication/'+id, {headers: headers});
  }

  getPublications(token, page = 1):Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url+'publication/?page='+page,  {headers: headers});
  }

  getPublicationsUser(token, id, page = 1):Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url+'publication/user/'+id+'/?page='+page,  {headers: headers});
  }

}
