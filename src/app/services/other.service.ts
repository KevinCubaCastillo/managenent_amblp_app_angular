import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../tools/response';
import { campeonato_body } from '../Models/campeonato_body';
import { escenario_body } from '../Models/escenario_body';
import { config } from '../config';
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class OtherService {
  url: string = config.apiUrl;

  constructor(private _http: HttpClient) { }
  verCampeonatos():Observable<response>{
    return this._http.get<response>(this.url + 'Others/verCampeonatosActive');
  } 
  registrarCampeonato(body: campeonato_body):Observable<response>{
    return this._http.post<response>(this.url + 'Others/registrarCampeonato' , body, httpOptions)
  }
 finalizarCampeonato(cod: string):Observable<response>{
    return this._http.patch<response>(this.url + 'Others/finalizarCampeonato/' + cod, httpOptions) 
  }
  inhabilitarCampeonato(cod: string):Observable<response>{
    return this._http.patch<response>(this.url + 'Others/inhabilitarCampeonato/' + cod, httpOptions) 
  }
  eliminarCampeonato(cod: string):Observable<response>{
    return this._http.patch<response>(this.url + 'Others/eliminarCampeonato/' + cod, httpOptions) 
  }
  verEscenarios():Observable<response>{
    return this._http.get<response>(this.url + 'Others/verEscenariosActive');
  }
  registarEscenario(body : escenario_body):Observable<response>{
    return this._http.post<response>(this.url + 'Others/registrarEscenario' , body , httpOptions);
  }
  suspenderEscenario(id: number):Observable<response>{
    return this._http.patch<response>(this.url + 'Others/suspenderEscenario/' + id, httpOptions)
  }
  inhabilitarEscenario(id: number):Observable<response>{
    return this._http.patch<response>(this.url + 'Others/inhabilitarEscenario/' + id, httpOptions)
  }
  eliminarEscenario(id: number):Observable<response>{
    return this._http.patch<response>(this.url + 'Others/eliminarEscenario/' + id, httpOptions)
  }
}
