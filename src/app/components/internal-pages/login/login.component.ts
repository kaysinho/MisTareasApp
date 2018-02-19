import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Message } from '../../../models/message';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  id: string = "";
  userLogin: User = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    password: ''
  };
  
  validation:Message={
    type: false,
    text:''
  };
  users: User[];
  constructor(public userService:UserService, private router: Router) { 
    this.id = sessionStorage.getItem("session");
    if (this.id!=null){
      this.router.navigate(['/panding-tasks']);
    }
  }


  ngOnInit() {
    this.userService.getUsers().subscribe(users =>{
      this.users = users;
    })
  }

  validateRegister():Message{
    let validate:Message ={
      text : '',
      type : false
    }
  
    //Validacion para el campo email
    var patt = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var res:boolean = patt.test(this.userLogin.email);
  
    if (this.userLogin.email.length==0){
      validate.text = 'Debe digitar un email valido!'
      return validate;
    }else if (!res){
      validate.text = 'La estructura del email debe ser: mail@mail.com!'
      return validate;
    }
  
    //Validacion para el campo contraseña
    if (this.userLogin.password.length<8){
      validate.text = 'La contraseña debe ser de al menos 8 caracteres!'
      return validate;
    }
    
    validate.type = true;
    return validate;
  }

  login(){
    this.validation = this.validateRegister();
    if (this.validation.type==true){
        let loginOk:boolean=false;
        let user_id:string='';
        for (var i=0; i<this.users.length; i++){
          if (this.users[i].email == this.userLogin.email &&
            this.users[i].password == this.userLogin.password ){
              loginOk=true;
              user_id=this.users[i].id;
          }
        }
        if (loginOk){ 
          sessionStorage.setItem('session', user_id);
          this.router.navigate(['/panding-tasks']);
        }else{
          this.validation.text="Datos errados!.. Si no se ha registrado puede hacerlo en el link Registrarse";
        }
    }
  }
  
}



