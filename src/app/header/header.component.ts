import { Component,OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { BasketComponent } from '../basket/basket.component';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../auth/auth.service';
import { proileservice } from '../profile/profile.service';
import { Router } from '@angular/router';
import { shop, shopService } from '../shop-list/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private matdialo:MatDialog,private authservice:AuthenticationService,private profilesrvice:proileservice,private router:Router,private shopservice:shopService){}


  role:string='';
  uplaodedimg:any;
  searchstr='';

  ngOnInit(): void {

    this.getprofileimg();
    
    this.role= this.authservice.getauth().role;
    this.authservice.authemiter.subscribe((role)=>{
    this.role=role;
    this.getprofileimg();
    })
     
    
  }

  getprofileimg(){
    this.profilesrvice.getImage(this.authservice.getauth().id+'_profile').subscribe(
      res => {
        // console.log(res)
        this.uplaodedimg  = URL.createObjectURL(res); 
      });
  }



  isDropdownOpen=false;


  openDropdown(){
    this.isDropdownOpen=!this.isDropdownOpen;
  }

  opencart(){
    this.matdialo.open(BasketComponent,{
     width:'60%',
    })
   }

   logout(){
    this.authservice.logout()
   }

   search(){
    this.router.navigate(['/shops']);
    this.shopservice.serching.next(this.searchstr);
    console.log('heloo')
  }


}
