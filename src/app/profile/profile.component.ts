import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../auth/auth.service';
import {  proileservice } from './profile.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

   uplaodedimg:any;
   uploadedimgfile:any;

  constructor(private activeroute:ActivatedRoute,private router:Router,private authservice:AuthenticationService,private profilservice:proileservice){}

  isAddingProfile=false;
  isEditingProfile=false;
  isEditingAddress=false;
  isEditingBankAccount=false;
  ProfileForm:FormGroup=new FormGroup({});
  onlyProfileForm:FormGroup=new FormGroup({});
  addressForm:FormGroup=new FormGroup({});
  bankForm:FormGroup=new FormGroup({});


  profile:Profile={id:1,name:'',age:0,profilepic:'', address:{
    id:1,addressLine1:"",addressLine2:'',city:'',state:'',pinCode:0
  },mobileNumber:0,emailId:'',bio:'',
  bankAccount:{
    id:1,accountHolderName:'',accountNumber:'',ifscCode:''
  },role:''};


   ngOnInit(): void {
    this.profilservice.profilechanged.subscribe((profiledb) => {
      this.profile = profiledb;
      if (this.profile) {
        this.profile.role = this.authservice.getauth().role;
        this.profilservice.getImage(this.profile.id+'_profile').subscribe(
          res => {
            // console.log(this.profile.profilepic)
            this.uploadedimgfile=res;
            this.uplaodedimg  = URL.createObjectURL(res); 
          });
        
        this.initForm();
      }
    });
    this.profile.role=this.authservice.getauth().role;
    const currentUrl = this.activeroute.snapshot.url;
    if(currentUrl[0].path==='add-profile'){
      this.isAddingProfile=true;
      this.initForm();
    }else{
      this.profilservice.getprofile();
      this.profile=this.profilservice.getprofiledetails();
    }
    this.activeroute.params.subscribe((params)=>{
      
      if(params['id']==='editprofile'){
        this.isEditingProfile=true;
      }
      if(params['id']==='editAddress'){
        this.isEditingAddress=true;
      }
      if(params['id']==='editBankDetails'){
        this.isEditingBankAccount=true;
      }
    })
    this.initForm();
    // this.profilservice.getprofile();
   }

   initForm(){
    if(this.isAddingProfile){
      
      let role='DEALEAR';

      this.ProfileForm=new FormGroup({
        'profilePic':new FormControl(null,[Validators.required]),
        'UserName':new FormControl(null,[Validators.required]),
        'UserBio':new FormControl(null,[Validators.required]),
        'userAge':new FormControl(null,[Validators.required,Validators.min(21),Validators.max(80)]),
        'userEmail':new FormControl(null,[Validators.required,Validators.email]),
        'userMobile':new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
        'userRole':new FormControl(role,[Validators.required]),
        'addressline1':new FormControl(null,[Validators.required]),
        'addressline2':new FormControl(null,[]),
        'addressCity':new FormControl(null,[Validators.required]),
        'addressstate':new FormControl(null,[Validators.required]),
        'pincode':new FormControl(null,[Validators.required,Validators.maxLength(6),Validators.minLength(6)]),
        'bankAccountHolder':new FormControl(null,[Validators.required]),
        'bankAccountNumber':new FormControl(null,[Validators.required,Validators.maxLength(15),Validators.minLength(8)]),
        "bankAccountIfsc":new FormControl(null,[Validators.required])
      })
    }else{
      console.log('hel')
      this.onlyProfileForm = new FormGroup({
        'profilePic': new FormControl({ value: this.profile.profilepic, disabled: !this.isEditingProfile }, [Validators.required]),
        'UserName': new FormControl({ value: this.profile.name, disabled: !this.isEditingProfile }, [Validators.required]),
        'UserBio': new FormControl({ value: this.profile.bio, disabled: !this.isEditingProfile }, [Validators.required]),
        'userAge': new FormControl({ value: this.profile.age, disabled: !this.isEditingProfile }, [Validators.required, Validators.min(21), Validators.max(80)]),
        'userEmail': new FormControl({ value: this.profile.emailId, disabled: !this.isEditingProfile }, [Validators.required, Validators.email]),
        'userMobile': new FormControl({ value: this.profile.mobileNumber, disabled: !this.isEditingProfile }, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        'userRole': new FormControl({ value: this.authservice.getauth().role, disabled: !this.isEditingProfile }, [Validators.required])
      });

      this.addressForm = new FormGroup({
        'addressline1': new FormControl({ value: this.profile.address.addressLine1, disabled: !this.isEditingAddress }, [Validators.required]),
        'addressline2': new FormControl({ value: this.profile.address.addressLine2, disabled: !this.isEditingAddress }, []),
        'addressCity': new FormControl({ value: this.profile.address.city, disabled: !this.isEditingAddress }, [Validators.required]),
        'addressstate': new FormControl({ value: this.profile.address.state, disabled: !this.isEditingAddress }, [Validators.required]),
        'pincode': new FormControl({ value: this.profile.address.pinCode, disabled: !this.isEditingAddress }, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
      });
      
      this.bankForm = new FormGroup({
        'bankAccountHolder': new FormControl({ value: this.profile.bankAccount.accountHolderName, disabled: !this.isEditingBankAccount }, [Validators.required]),
        'bankAccountNumber': new FormControl({ value: this.profile.bankAccount.accountNumber, disabled: !this.isEditingBankAccount }, [Validators.required, Validators.maxLength(15), Validators.minLength(8)]),
        'bankAccountIfsc': new FormControl({ value: this.profile.bankAccount.ifscCode, disabled: !this.isEditingBankAccount }, [Validators.required])
      });

    }
   }

   editProfile(){
    this.router.navigate(['/my-profile/editprofile'])
   }
   editAddress(){
    this.router.navigate(['/my-profile/editAddress'])
   }
   editbankAccount(){
    this.router.navigate(['/my-profile/editBankDetails'])
   }
   addprofile(){
    
    this.profilservice.setprofileimg(this.uploadedimgfile);

    let newprofile:Profile={id:0,name:this.ProfileForm.value['UserName'],age:this.ProfileForm.value['userAge'],profilepic:this.authservice.getauth().id+'_profile', address:{
      id:0,addressLine1:this.ProfileForm.value['addressline1'],addressLine2:this.ProfileForm.value['addressline2'],city:this.ProfileForm.value['addressCity'],state:this.ProfileForm.value['addressstate'],pinCode:this.ProfileForm.value['pincode']
    },mobileNumber:this.ProfileForm.value['userMobile'],emailId:this.ProfileForm.value['userEmail'],bio:this.ProfileForm.value['UserBio'],
    bankAccount:{
      id:0,accountHolderName:this.ProfileForm.value['bankAccountHolder'],accountNumber:this.ProfileForm.value['bankAccountNumber'],ifscCode:this.ProfileForm.value['bankAccountIfsc']
    },role:this.authservice.getauth().role};

    

    this.profilservice.addprofile(newprofile).subscribe((responce)=>{
      console.log(responce)
      if(responce.statusText==='OK'){
        this.profilservice.getprofile();
        this.router.navigate(['/my-profile'])
      }
    });

    // this.router.navigate(['/my-profile']);
   }

   updateprofile(){
    let profileonly:{
      "name": string,
      "age": number,
      "profilePic": string,
      "mobileNumber": string,
      "emailId": string,
      "bio": string,
      "role": string
  }={'name':this.onlyProfileForm.value['UserName'],
  'age':this.onlyProfileForm.value['userAge'],
  'profilePic':this.onlyProfileForm.value['profilePic'],
  "mobileNumber": this.onlyProfileForm.value['userMobile'],
  "emailId": this.onlyProfileForm.value['userEmail'],
  "bio": this.onlyProfileForm.value['UserBio'],
  "role": this.onlyProfileForm.value['userRole']
}

    this.profilservice.setprofileimg(this.uploadedimgfile)
    this.profilservice.updateprofile(profileonly).subscribe((responce)=>{
      console.log(responce)
      if(responce.statusText==='OK'){
        this.profilservice.getprofile();
        this.router.navigate(['/my-profile'])
      }
    });


   }
   updateAddress(){
    let updateAddress:{
      "addressLine1":string,
     "addressLine2":string,
     "city":string,
     "state":string,
     "pinCode":number}={
      "addressLine1":this.addressForm.value['addressline1'],
     "addressLine2":this.addressForm.value['addressline2'],
     "city":this.addressForm.value['addressCity'],
     "state":this.addressForm.value['addressstate'],
     "pinCode":this.addressForm.value['pincode']
     }
     this.profilservice.updateAddress(updateAddress).subscribe((responce)=>{
      console.log(responce)
      if(responce.statusText==='OK'){
        this.profilservice.getprofile();
        this.router.navigate(['/my-profile'])
      }
    });
   }
   updatebank(){

    let updatebankdetail:{
      "accountHolderName":string,
      "accountNumber":string,
      "ifscCode":string}={
        "accountHolderName":this.bankForm.value['bankAccountHolder'],
        "accountNumber":this.bankForm.value['bankAccountNumber'],
        "ifscCode":this.bankForm.value['bankAccountIfsc']}
    this.profilservice.updateBankdetail(updatebankdetail).subscribe((responce)=>{
      console.log(responce)
      if(responce.statusText==='OK'){
        this.profilservice.getprofile();
        this.router.navigate(['/my-profile'])
      }
    });
   }
   cancelupdateprofile(){
    this.router.navigate(['/my-profile'])
   }
   cancelupdateAddress(){
    this.router.navigate(['/my-profile'])
   }
   calcelupdatebank(){
    this.router.navigate(['/my-profile'])
   }


   uploadedimage(event:any){
    this.uplaodedimg = URL.createObjectURL(event.target.files[0]);
    this.uploadedimgfile=event.target.files[0];
   }
}
