import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../tools/response';
import { config } from '../config';
import { equipo_body } from '../Models/equipo_body';
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  url: string = config.apiUrl;
  constructor(private _http: HttpClient) { }
  verEquipos():Observable<response>{
    return this._http.get<response>(this.url + 'Equipos/verEquiposActive')
  }
  verEquiposClub(cod: string):Observable<response>{
    return this._http.get<response>(this.url + 'Equipos/verEquiposPorClub/' + cod)
  }
  registrarEquipo(body : equipo_body):Observable<response>{
    return this._http.post<response>(this.url + 'Equipos/registrarEquipo', body, httpOptions)
  }
  registrarJugadorEquipo(id: number, ci: string):Observable<response>{
    return this._http.patch<response>(this.url + 'Equipos/registrarJugadorEquipo/' + id + '/' + ci, httpOptions)
  }
  eliminarEquipo(id: number):Observable<response>{
    return this._http.patch<response>(this.url + 'Equipos/eliminarEquipo/' + id, httpOptions)
  }
  eliminarJugadorEq(id:number, ci: string):Observable<response>{
    return this._http.delete<response>(this.url + 'Equipos/quitarJugadorEquipo/' + id + '/' + ci);
  }
}
