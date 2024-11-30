import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from '../tools/response';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  url: string = config.apiUrl;
  constructor(private _http : HttpClient) { }
  verPartidos():Observable<response>{
    return this._http.get<response>(this.url + 'Partidos/verPartidos');
  }
}
