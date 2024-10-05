import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from '../tools/response';
import { entrenadorAddBody } from '../Models/entrenador_add_body';
import { config } from '../config';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class EntrenadoresService {
  url: string = config.apiUrl;

  constructor(private _http : HttpClient) { }

  verEntrenadores():Observable<response>{
    return this._http.get<response>(this.url + 'Entrenadores/verEntrenadoresActive')
  }
  registrarEntrenador(body: entrenadorAddBody):Observable<response>{
    return this._http.post<response>(this.url + 'Entrenadores/registrarEntrenador', body, httpOptions)
  }
  eliminarEntrenador(ci: string):Observable<response>{
    return this._http.patch<response>(this.url + 'Entrenadores/eliminarEntrenador/' + ci, httpOptions)
  }
}
