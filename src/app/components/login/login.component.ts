import { NgIf } from '@angular/common';
import { Component, Output, EventEmitter, input, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { loginBody } from '../../Models/login/loginBody';
import { user } from '../../Models/login/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public oLogin : loginBody;
  public user : any;
  constructor(private _loginService : LoginService, private _router : Router){
    this.oLogin = { user: "", password: ""}
  }

  username : string ="";
password : string ="";
submit(){
this.oLogin.user = this.username;
this.oLogin.password = this.password 
this._loginService.login(this.oLogin).subscribe(x =>{
  if(x.success){
    console.log(x);
    this._router.navigate(['/'])

  }else{
    console.log(x.errors);
    
  }
});


this.clear();
}
clear(){
this.username ="";
this.password = "";
}
}
