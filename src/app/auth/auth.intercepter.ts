import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {Observable} from 'rxjs'
import { AuthenticationService } from './auth.service';

@Injectable({
    providedIn:'root'
})
export class authIntercepter implements HttpInterceptor{

    constructor(private authservice:AuthenticationService){}

    intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

        if(this.authservice.getauth().JwtToken){
            const authRequest=request.clone({
                setHeaders:{
                    'Authorization':'Bearer '+this.authservice.getauth().JwtToken
                }
            })
            // console.log(authRequest.headers);
            return next.handle(authRequest);
        }
        else{
            // console.log("2")
            return next.handle(request);
        }

    }

}