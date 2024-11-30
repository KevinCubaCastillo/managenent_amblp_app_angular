import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { LoginService } from './services/login.service';
import { NgIf } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf,RouterOutlet, MatSidenavModule,MatButtonModule,MatToolbarModule,MatIconModule,MatMenuModule, MatListModule, RouterModule, NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'amblp_gestion_app';
  showFiller = false;
  user: any;
  constructor(private _loginS: LoginService, private _router : Router){
     this._loginS.usuarioObs.subscribe(x =>{
      console.log("Cambio objeto")

      
      this.user = _loginS.userData;
      console.log("Usuario:");
      console.log(this.user);
     })
  }
  logout(){
    this._loginS.logout();
    this._router.navigate(['/login'])
  }

}
