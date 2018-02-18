import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Message } from '../../../models/message'
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})

export class SingInComponent implements OnInit {
  user: User = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    password: ''
  };
  password_two: string = "";
  validation: Message = {
    type: false,
    text: ''
  };
  users: User[];
  message_success: string='';
  constructor(public userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  validateRegister(): Message {
    let validate: Message = {
      text: '',
      type: false
    }

    //Validacion para el campo nombre
    if (this.user.name.length == 0) {
      validate.text = 'Debe digitar un nombre valido!'
      return validate;
    }

    //Validacion para el campo apellidos
    if (this.user.lastName.length == 0) {
      validate.text = 'Debe digitar un apellido valido!'
      return validate;
    }

    //Validacion para el campo email
    var patt = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var res: boolean = patt.test(this.user.email);

    if (this.user.email.length == 0) {
      validate.text = 'Debe digitar un email valido!'
      return validate;
    } else if (!res) {
      validate.text = 'La estructura del email debe ser: mail@mail.com!'
      return validate;
    }

    //Validacion para el campo contraseña
    if (this.user.password.length < 8) {
      validate.text = 'La contraseña debe ser de al menos 8 caracteres!'
      return validate;
    }

    //Validacion para el campo contraseña 2
    if (this.password_two.length == 0) {
      validate.text = 'Por favor repita la contraseña!'
      return validate;
    }

    //Validaciones generales de contraseña
    if (this.user.password != this.password_two) {
      validate.text = 'Las contraseñas no coinciden!'
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

  sendRegister() {
    this.validation = this.validateRegister();
    if (this.validation.type == true) {
      let ifExistMail: boolean = false;
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].email == this.user.email) {
          ifExistMail = true;
        }
      }
      if (ifExistMail) {
        this.validation.text = "Este email ya existe como usuario registrado, por favor cambielo";
      } else {
        this.userService.addUser(this.user);
        this.cleanForm();
        this.message_success ="Te has registrado correctamente, ya puede iniciar sesión";
      }
    }
  }

  cleanForm(){
    this.user.id= '';
    this.user.name= '';
    this.user.lastName= '';
    this.user.email= '';
    this.user.password= '';
    this.password_two = '';
  }
}
