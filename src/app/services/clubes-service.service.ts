import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from '../tools/response';
import { club_add_body } from '../Models/Clubes/club_add_body';
import { config } from '../config';
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ClubesServiceService {
  url: string = config.apiUrl;
  constructor(private _http: HttpClient) { }
  getClubes():Observable<response>{
    return this._http.get<response>(this.url + 'Clubes/verClubesActive')
  }
  postClubes(body: club_add_body):Observable<response>{
    return this._http.post<response>(this.url + 'Clubes/registrarClub', body, httpOptions)
  }
  eliminarClub(cod : string):Observable<response>{
    return this._http.patch<response>(this.url + 'Clubes/eliminarClub/' + cod, httpOptions)
  }
}
