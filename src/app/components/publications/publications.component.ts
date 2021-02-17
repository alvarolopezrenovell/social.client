import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Publication } from "../../models/publication";
import { GLOBAL } from "../../services/global";
import { UserService } from "../../services/user.service";
import { PublicationService } from "../../services/publication.service";

@Component({
  selector: 'publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [UserService, PublicationService]
})

export class PublicationsComponent implements OnInit {
  public identity;
  public token;
  public url;
  public status;
  public page;
  public total;
  public pages;
  public perPage;
  public noMore = false;
  public publications: Publication[];

  @Input() timeline = false;
  @Input() user_id;

  constructor (
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.identity = this._userService.getUserAuth();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
  }

  ngOnInit(): void {
    console.log('Componente <publications> cargado');
    this.getPublications(this.user_id, this.page);
  }

  // List

  getPublications(user_id, page = 1, adding = false) {
    if (this.timeline) {
      this._publicationService.getPublications(this.token, page).subscribe(
        response => { this.processPublications(response, page, adding); },
        error => { this.processError(error); }
      );
    } else {
      this._publicationService.getPublicationsUser(this.token, user_id, page).subscribe(
        response => { this.processPublications(response, page, adding); },
        error => { this.processError(error); }
      );
    }

  }

  viewMore() {
    this.page += 1;
    this.getPublications(this.user_id, this.page, true);
  }

  refreshPublications() {
    this.getPublications(this.user_id);
  }

  processPublications(response, page, adding) {
    if (response.publications) {
      this.total = response.total;
      this.pages = response.pages;
      this.perPage = response.per_page;

      if (!adding) {
        this.publications = response.publications;
      } else {
        var publications = this.publications;
        var newPublications = response.publications;
        this.publications = publications.concat(newPublications);

        // $('html, body').animate({ scrollTop: ($('body').prop('scrollHeight') - 130) }, 750);
      }

      if (this.publications.length === this.total) {
        this.noMore = true;
      }

      if (page > this.pages && this.pages > 0) {
        this._router.navigate(['']);
      }

      this.status = true;
    } else {
      this.status = false;
    }
  }

  processError(error) {
    var message = <any>error;
    if (message !== null) {
      this.status = false;
    }
  }

  // Delete

  deletePublication(id) {
    this._publicationService.deletePublication(this.token, id).subscribe(
      response => {
        this.refreshPublications();
      },
      error => { this.processError(error); }
    );
  }

}
