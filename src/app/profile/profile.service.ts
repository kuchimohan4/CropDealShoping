import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
import { Profile } from './profile.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';







@Injectable({
    providedIn:'root'
})
export class proileservice{

    profilechanged:Subject<Profile>=new Subject();


    profile:Profile={id:1,name:'',age:0,profilepic:'', address:{
      id:1,addressLine1:"",addressLine2:'',city:'',state:'',pinCode:0
    },mobileNumber:0,emailId:'',bio:'',
    bankAccount:{
      id:1,accountHolderName:'',accountNumber:'',ifscCode:''
    },role:''};

    constructor(private http:HttpClient,private authservice:AuthenticationService,private roter:Router){}


    addprofile(profil:Profile){
      return  this.http.post("http://localhost:8765/profile/addProfile",profil,{ observe: 'response' });

    }   

    getprofile(){
        this.http.get<Profile>("http://localhost:8765/profile/getprofile",{ observe: 'response' })
        .subscribe((Response)=>{
            if(this.profile !==null){
                this.profile=Response.body!;
                this.profilechanged.next({...this.profile});
            }
            
        },error=>{
            console.log(error)
        })
    }

    getprofiledetails(){
        return {...this.profile};
    }

    updateprofile(updatedprofile: {
        "name": string,
        "age": number,
        "profilePic": string,
        "mobileNumber": string,
        "emailId": string,
        "bio": string,
        "role": string
    }) {
        
      return  this.http.put('http://localhost:8765/profile/updateProfile',updatedprofile, { observe: 'response' });
    }

    updateAddress(updateaddress:{
      "addressLine1":string,
     "addressLine2":string,
     "city":string,
     "state":string,
     "pinCode":number}){

      return  this.http.put('http://localhost:8765/profile/updateaddress',updateaddress, { observe: 'response' });

    }

    updateBankdetail(updatedbankdetai:{
      "accountHolderName":string,
      "accountNumber":string,
      "ifscCode":string}){

        
      return  this.http.put('http://localhost:8765/profile/updateBankAccount',updatedbankdetai, { observe: 'response' });

      }



    setprofileimg(imgdata:any){
        const uploadImageData = new FormData();
        uploadImageData.append('image', imgdata,this.authservice.getauth().id+'_profile');

            this.http.post('http://localhost:8765/profile/uploadimg', uploadImageData, { observe: 'response' })
            .subscribe((response) => {
                console.log(response);
                if (response.status === 200) {
                console.log('Image uploaded successfully');
                }
                console.log('Image uploaded failed continuing with profile upload');
            }
            );
    }
    getImage(imagename:string) {
        //Make a call to Sprinf Boot to get the Image Bytes.
      return   this.http.get('http://localhost:8765/profile/downloadimg/' + imagename,{ responseType: 'blob'});
          
      }

}