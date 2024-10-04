import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/login.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

constructor(private _router : Router, private _apiService : LoginService){
}
canActivate(route : ActivatedRouteSnapshot){
    const usuario = this._apiService.userData;
    if(usuario != null){
        return true;
    }
    this._router.navigate(['/login']);
    return false;
}
}