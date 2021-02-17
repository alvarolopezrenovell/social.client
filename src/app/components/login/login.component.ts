import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    UserService
  ]
})

export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public status: boolean;
  public message: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) {
    this.title = 'Identificate';
    this.user = new User();
  }

  ngOnInit(): void {
    console.log('Componente de login cargado');
  }

  onSubmit(loginForm) {
    this._userService.login(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = true;

          this._userService.setUserAuth(response.user);
          this._userService.setToken(response.token);
          this.getCounters();

          this._router.navigate(['/']);
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

  getCounters() {
    this._userService.getCounters().subscribe(
      response => {
        if (Object.keys(response).length) {
          this._userService.setStats(response);
        }
      },
      error => {
        this.status = false;
      }
    );
  }

}
