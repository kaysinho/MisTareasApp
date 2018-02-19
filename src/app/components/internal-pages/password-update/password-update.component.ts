import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Message } from '../../../models/message'
import { UserService } from '../../../services/user.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {
  user: User = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    password: ''
  };
  password_two: string = "";
  password: string = "";
  password_old: string = "";
  password_current: string = "";
  validation: Message = {
    type: false,
    text: ''
  };
  users: User[];
  message_success: string = '';
  constructor(public userService: UserService, private router:Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("session")==null){
      this.router.navigate(['/login']);
    }
    this.getUser()
  }

  getUser() {
    this.userService.getUsers().subscribe(user => {
      this.users = user;
      this.users = this.users.filter(item => item.id == sessionStorage.getItem("session"));
      this.user = this.users[0];
      this.password_old = this.user.password;

    })
  }

  validateRegister(): Message {
    let validate: Message = {
      text: '',
      type: false
    }

    //Validaciones generales de contraseña antigua
    if (this.password_old != this.password_current) {
      validate.text = 'Su contraseña actual esta errada!'
      return validate;
    }

    //Validacion para el campo contraseña
    if (this.password.length < 8) {
      validate.text = 'La contraseña debe ser de al menos 8 caracteres!'
      return validate;
    }

    //Validacion para el campo contraseña 2
    if (this.password_two.length == 0) {
      validate.text = 'Por favor repita la contraseña!'
      return validate;
    }

    //Validaciones generales de contraseña
    if (this.password != this.password_two) {
      validate.text = 'Los campos de contraseña nueva no coinciden!'
      return validate;
    }

    let numbers: number = 0;
    let specials: number = 0;
    let specialsCharacters: string = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    for (var i = 0; i < this.password_two.length; i++) {
      var c = this.password_two.charAt(i)
      if (!isNaN(parseFloat(c))) {
        numbers++;
      } else if (specialsCharacters.indexOf(c) > 0) {
        specials++;
      }
    }

    if (numbers < 2) {
      validate.text = 'La contraseña debe tener al menos dos números!'
      return validate;
    }

    if (specials < 1) {
      validate.text = 'La contraseña debe tener al menos un caracter especial: ' + specialsCharacters;
      return validate;
    }

    validate.type = true;
    return validate;
  }

  updatePassword() {
    this.validation = this.validateRegister();
    if (this.validation.type == true) {
      this.user.password = this.password
      this.userService.updateUser(this.user);
      this.message_success = "Se ha cambiado la contraseña!, por favor vuelva a entrar al Sistema"
      sessionStorage.clear();
      setTimeout(() => {
        location.reload();
      }, 2000);

    }
  }

}
