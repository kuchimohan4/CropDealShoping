import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable,OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, map } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AuthenticationService {

    authemiter:Subject<string>=new Subject();
    private tokenExpirationTime:any;

    private auth:{JwtToken:string, role:string, expiresat:Date, id:number}={JwtToken:'', role:'', expiresat:new Date(), id:0};

    constructor(private http:HttpClient,private roter:Router){
        if (localStorage.getItem('auth')) {
            this.auth = JSON.parse(localStorage.getItem('auth')!);
            this.authemiter.next(this.auth.role);
            this.autoLogout((new Date(this.auth.expiresat)).getTime()-(new Date().getTime())); 
        } 
      }

    login(logindetails:{email: string, password: string }){
     return  this.http.post<{JwtToken:string, role:string, expirationTime:number, id:number}>('http://localhost:9898/auth/token',logindetails).pipe(map((responce)=>{
            this.auth={JwtToken:responce.JwtToken, role:responce.role, expiresat:new Date(new Date().getTime()+responce.expirationTime*1000), id:responce.id}
            localStorage.setItem('auth', JSON.stringify(this.auth));
            this.authemiter.next(this.auth.role);
            this.autoLogout(responce.expirationTime*1000);
        }));
    }

    register(signupcred:{Name:string, email:string, password:string, confirmPassword: string, Role: string}){

       let regcred={ name:signupcred.Name,email:signupcred.email,password:signupcred.password,role:signupcred.Role};
      return  this.http.post('http://localhost:9898/auth/register',regcred);
    }


    validateemail(otp:{email:string,otp:string}){

      return this.http.post<{msg:string}>('http://localhost:9898/auth/validateMail',otp);
    }

    logout(){
        localStorage.removeItem('auth');
        this.authemiter.next('');
        this.roter.navigate(['/login']);
        if (this.tokenExpirationTime) {
            clearTimeout(this.tokenExpirationTime);
          }
          this.tokenExpirationTime = null;
    }


    getauth():{JwtToken:string, role:string, expiresat:Date, id:number}{
        return {...this.auth};
    }


    autoLogout(expirationTime:number){
        this.tokenExpirationTime=setTimeout(()=>{
            this.logout();
        },expirationTime)

    }


    

}