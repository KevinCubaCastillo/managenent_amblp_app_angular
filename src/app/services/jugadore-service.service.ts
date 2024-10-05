import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from '../tools/response';
import { jugador_add_body } from '../Models/Jugadores/jugador_add_body';
import { medidas_body } from '../Models/Jugadores/medidas_body';
import { config } from '../config';
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})

export class JugadoreServiceService {
  url: string = config.apiUrl;
  //url: string = 'https://localhost:7283/api/'
  constructor(private _http: HttpClient) { }
  verJugadores():Observable<response>{
    return this._http.get<response>(this.url + 'Jugadores/verJugadores')
  }
  verJugadoresClub(cod: string):Observable<response>{
    return this._http.get<response>(this.url + 'Jugadores/verJugadoresByClub/' + cod)
  }
  eliminarJugadorClub(ci: string):Observable<response>{
    return this._http.patch<response>(this.url + 'Jugadores/eliminarJugadorClub/' + ci, httpOptions)
  }
  registrarJugador(body: jugador_add_body):Observable<response>{
    return this._http.post<response>(this.url + 'Jugadores/registrarJugador', body, httpOptions)
  }
  registrarMedidas(ci: string, body: medidas_body):Observable<response>{
    return this._http.put<response>(this.url + 'Jugadores/registrarMedidas/'+ ci, body,httpOptions)
  }
}
