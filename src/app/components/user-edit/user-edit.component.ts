import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { UploadService } from "../../services/upload.service";
import { User } from "../../models/user";
import { GLOBAL} from "../../services/global";

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [
    UserService,
    UploadService,
  ]
})

export class UserEditComponent implements OnInit {
  public title: string;
  public user: User;
  public token: string;
  public status: boolean;
  public message: string;
  public url: string;
  public filesToUpload: Array<File>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService,
  ) {
    this.title = 'Actualizar mis datos';
    this.user = this._userService.getUserAuth();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    console.log('Componente de <user-edit> cargado');
  }

  onSubmit(editForm) {
    this._userService.update(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = true;
          this.message = 'Datos actualizados';
          this.user = response.user;
          this._userService.setUserAuth(this.user);

          let url = this.url+'user/upload-image/'+response.user._id;
          this._uploadService.makeFileRequest(url, [], this.filesToUpload, this.token, 'image')
            .then((result: any) => {
              this.user.image = result.user.image;
              this._userService.setUserAuth(this.user);
            });
        } else if (response.message) {
          this.status = false;
          this.message = response.message;
        }
      },
      error => {
        this.status = false;
        this.message = 'Error al enviar el formulario';
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
