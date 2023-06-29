import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  constructor( private route:ActivatedRoute,private router:Router,private authservice:AuthenticationService){}

  logingIn=false;
  isVerifingOtp=false;
  errorBackend='';

  loginForm:FormGroup=new FormGroup({});
  otpForm:FormGroup=new FormGroup({
    "otp1":new FormControl(null,[Validators.required,this.otpValidateor]),
    "otp2":new FormControl(null,[Validators.required,this.otpValidateor]),
    "otp3":new FormControl(null,[Validators.required,this.otpValidateor]),
    "otp4":new FormControl(null,[Validators.required,this.otpValidateor]),
    "otp5":new FormControl(null,[Validators.required,this.otpValidateor]),
    "otp6":new FormControl(null,[Validators.required,this.otpValidateor]),
  });


ngOnInit(): void {
  this.route.queryParams.subscribe((params:Params)=>{
    this.logingIn=!params["type"];
   
    if(this.logingIn){
      this.loginForm=new FormGroup({
          "email":new FormControl(null,[Validators.required,Validators.email]),
        "password":new FormControl(null,Validators.required)
      })
    }else{

      this.loginForm=new FormGroup({
        "Name":new FormControl(null,Validators.required),
        "email":new FormControl(null,[Validators.required,Validators.email]),
        "password":new FormControl(null,[Validators.required,this.passwordValidator]),
      "confirmPassword":new FormControl(null,Validators.required),
      "Role":new FormControl(null,Validators.required)
    },{validators:[this.passwordMatchValidator]})
    }
  })

  
}

passwordMatchValidator(control: AbstractControl):{[key:string]:any} | null{
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
  }
  return null;
}

otpValidateor(control: AbstractControl): { [key: string]: any } | null {
  const password:string = control.value;
  const isnumber = /[0-9]/.test(password);
  if(!isnumber){
    return {"invalid":true }
  }
  return null;
}

  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const password:string = control.value;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
    var validLength=false;
    if(!(password===null)){
      validLength = password.length >= 8;
    }

    if (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecialChar || !validLength ) {
      return { "invalidPassword": true };
    }
    return null;
  }



loginsignup(){
  if(this.logingIn){
    //somprocess
    this.authservice.login(this.loginForm.value).subscribe((responce)=>{
        this.router.navigate(['/shops'])
    },(error)=>{
      this.errorBackend=error.error;
      // console.log(error.error);
    })

  }else{
    console.log(this.loginForm.value);
    this.authservice.register(this.loginForm.value).subscribe((response)=>{
      this.isVerifingOtp=true;
    },(error)=>{
      console.log(error);
      this.errorBackend=error.error;
    });
  }

}

submitOtp(){
  var otP=this.otpForm.value['otp1']+this.otpForm.value['otp2']+this.otpForm.value['otp3']+this.otpForm.value['otp4']+this.otpForm.value['otp5']+this.otpForm.value['otp6'];
  let otpcon:{email:string,otp:string}={email:this.loginForm.value['email'],otp:otP};
  this.authservice.validateemail(otpcon).subscribe((responce)=>{
    this.errorBackend=responce.msg;
      this.authservice.login({email:this.loginForm.value['email'],password:this.loginForm.value['password']}).subscribe((responce)=>{
          this.router.navigate(['../add-profile'])
      })
  },(error)=>{
    this.errorBackend=error.error;
  });

  // console.log(otp);
}

} 
