import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from '../tools/response';
import { jugador_add_body } from '../Models/Jugadores/jugador_add_body';
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})

export class JugadoreServiceService {
  //url: string = 'http://amblpmanagement.somee.com/api/'
  url: string = 'https://localhost:7283/api/'
  constructor(private _http: HttpClient) { }
  verJugadores():Observable<response>{
    return this._http.get<response>(this.url + 'Jugadores/verJugadores')
  }
  registrarJugador(body: jugador_add_body):Observable<response>{
    return this._http.post<response>(this.url + 'Jugadores/registrarJugador', body, httpOptions)
  }
}
