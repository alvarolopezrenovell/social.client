import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { GLOBAL } from "../../services/global";
import { Publication } from "../../models/publication";
import { PublicationService } from "../../services/publication.service";
import { UploadService } from "../../services/upload.service";
import {User} from "../../models/user";
import {FollowService} from "../../services/follow.service";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, PublicationService, UploadService, FollowService]
})

export class SidebarComponent implements OnInit{
  public identity: User;
  public user: User;
  public token;
  public stats;
  public url;
  public status;
  public followed = false;
  public following = false;
  public publication: Publication;
  public files: Array<File>;

  // Output
  @Output() sent = new EventEmitter();

  // Input
  @Input() user_id = null;

  constructor (
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _uploadService: UploadService,
    private _followService: FollowService
  ) {
    this.identity = this._userService.getUserAuth();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.publication = new Publication("", "", "", this.identity, "");
  }

  ngOnInit(): void {
    console.log('Componente <sidebar> cargado');
    this.loadPage();
  }

  loadPage() {
    if (this.user_id === null) {
      this.user_id = this.identity._id;
    }

    this.getUser(this.user_id);
    this.getCounters(this.user_id);
  }

  getUser(id) {
    this._userService.getUsers(id).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;
          this.following = response.following && response.following._id !== null;
          this.followed = response.followed && response.followed._id !== null;
        }
      }
    );
  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      response => {
        if (response) {
          this.stats = response;
        }
      }
    );
  }

  follow(followed) {
    this._followService.follow(followed, this.token).subscribe(
      response => {
        if (response.follow) {
          this.following = true;
        }
      }
    );
  }

  unfollow(followed) {
    this._followService.unfollow(followed, this.token).subscribe(
      response => {
        if (response.message == "Unfollowed") {
          this.following = false;
        }
      }
    );
  }

  onSubmit(form, event) {
    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if (response.publication) {

          if (this.files) {
            this._uploadService.makeFileRequest(this.url+'/publication/upload-file/'+response.publication._id, [], this.files, this.token, 'file').then(
              (result: any) => {
                this.publication.file = result.image;
              }
            );
          }

          this.sent.emit({sent: true});
          this.status = true;
        } else {
          this.status = false;
        }
      },
      error => {
        var message = <any>error;
        if (message !== null) {
          this.status = false;
        }
      }
    );
  }

  fileChangeEvent(event) {
    this.files = <Array<File>>event.target.files;
  }

}
