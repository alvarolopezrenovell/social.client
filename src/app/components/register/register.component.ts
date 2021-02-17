import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    UserService
  ]
})

export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;
  public status: boolean;
  public message: string;

  constructor (
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) {
    this.title = 'Registrate';
    this.user = new User(
      "",
      "",
      "",
      "",
      "",
      "",
      "ROLE_USER",
      "",
    );
    this.status = null;
    this.message = 'Error al enviar el formulario';
  }

  ngOnInit(): void {
    console.log('Componente de <register> cargado');
  }

  onSubmit(registerForm) {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = true;
          this.message = 'Registro completado correctamente';
          registerForm.reset();
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

}
