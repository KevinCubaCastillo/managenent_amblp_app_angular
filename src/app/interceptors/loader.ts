import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Observable, finalize } from "rxjs";

@Injectable()
export class loaderInteceptor implements HttpInterceptor{
    constructor(private _loader: NgxUiLoaderService){

    }
    private _activeRequest = 0;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this._activeRequest === 0){
            this._loader.start();
        }
        this._activeRequest++;
        return next.handle(req).pipe(finalize(() => this.stopLoader()));
    }
    private stopLoader(){
        this._activeRequest--;
        if(this._activeRequest === 0){
            this._loader.stop();
        }
    }
}