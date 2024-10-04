import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginBody } from '../Models/login/loginBody';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { response } from '../tools/response';
import { user } from '../Models/login/user';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  url: string = 'http://amblpmanagement.somee.com/api/'
  private _usuarioSubject = new BehaviorSubject<any>(null);
  public usuarioObs!: Observable<user>;
  public get userData(): user{
    return this._usuarioSubject.value;
  }
  constructor(private _http: HttpClient) { 
    if (typeof localStorage !== 'undefined') {
      this._usuarioSubject = new BehaviorSubject<user>(JSON.parse(localStorage.getItem('userLog') || '{}'));
      this.usuarioObs = this._usuarioSubject.asObservable();
    } else {
      console.error('El objeto localStorage no está disponible en este contexto.');
    }
  }
  login(body: loginBody):Observable<response>{
    return this._http.post<response>(this.url + 'Login/login', body, httpOptions).pipe(
      map(i =>{
        if(i.success){
          const cUser : user = i.data;
          localStorage.setItem('userLog', JSON.stringify(cUser));
          this._usuarioSubject.next(cUser);
        }  
        return i;
      })
    );
  }
  logout(){
    localStorage.removeItem('userLog');
    this._usuarioSubject.next(null);
    console.log('lolsx')
  }
}
