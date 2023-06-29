import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { shopService } from '../shop.service';
import { proileservice } from 'src/app/profile/profile.service';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-new-shop',
  templateUrl: './new-shop.component.html',
  styleUrls: ['./new-shop.component.css']
})
export class NewShopComponent implements OnInit {
  constructor(private activerote:ActivatedRoute,private shopservice:shopService,private profilservice:proileservice,private authservice:AuthenticationService,private router:Router){}

  uplaodedimg:any;
  uploadedimgfile:any;
  isediting=true;
  shopform:any;
  error:any;

shop={ shopid:0,shopName:'',shopImg:'',shopRating:0,shopDesc:''};
    
ngOnInit(): void {
  this.activerote.queryParams.subscribe((params) => {
    if (params['new'] === 'true') {
      this.isediting = false;
      this.initform();
    } else {
      this.shopservice.getshop();
    }
  });

  this.shopservice.shopchanged.subscribe((shop) => {
    this.shop = shop;
    this.shopservice.getImage(this.shop.shopid+'_shopImg').subscribe(
      res => {
        // console.log(this.profile.profilepic)
        this.uploadedimgfile=res;
        this.uplaodedimg  = URL.createObjectURL(res); 
      });
    if (this.isediting) {
      this.initform();
    }
  });
}



initform(){

  if(this.isediting){
    console.log('hello')
    console.log(this.shop)  
      this.shopform=new FormGroup({
        'shopName':new FormControl(this.shop.shopName,[Validators.required,Validators.maxLength(20)]),
          'shopImg':new FormControl(null,[Validators.required]),
          'shopDesc':new FormControl(this.shop.shopDesc,[Validators.required,Validators.minLength(30),Validators.max(100)])
      });
    }
  else{
    this.shopform=new FormGroup({
      'shopName':new FormControl(null,[Validators.required,Validators.maxLength(20)]),
        'shopImg':new FormControl(null,[Validators.required]),
        'shopDesc':new FormControl(null,[Validators.required,Validators.minLength(30),Validators.max(100)])
    })
  }

}


saveshop(){
  if(this.isediting){
    this.shopservice.setshopimg(this.uploadedimgfile);
    let shopinput={ shopid:0,shopName:this.shopform.value['shopName'],shopImg:this.authservice.getauth().id+"_shopImg",shopRating:0,shopDesc:this.shopform.value['shopDesc']};
    this.shopservice.updateShop(shopinput).subscribe((Response)=>{
      if(Response.status===200){
        
      this.router.navigate(['../edit-shop'])
      }
    },error=>{
      console.log(error.error.message)
      error=error;
    })

  }else{
    this.shopservice.setshopimg(this.uploadedimgfile);
   let shopinput={ shopid:0,shopName:this.shopform.value['shopName'],shopImg:this.authservice.getauth().id+"_shopImg",shopRating:0,shopDesc:this.shopform.value['shopDesc']}
    this.shopservice.addshop(shopinput).subscribe((Response)=>{
      if(Response.status===200){
        
      this.router.navigate(['../edit-shop'])
      }
    },error=>{
      console.log(error.error.message)
      error=error;
      this.router.navigate(['../shops/edit-shop'])
      
    })
  }

  
  console.log(this.shopform.value)
  
}




uploadedimage(event:any){
  this.uplaodedimg = URL.createObjectURL(event.target.files[0]);
  console.log("henn")
  this.uploadedimgfile=event.target.files[0];
 }

}
