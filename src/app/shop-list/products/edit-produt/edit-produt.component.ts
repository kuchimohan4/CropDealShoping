import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-produt',
  templateUrl: './edit-produt.component.html',
  styleUrls: ['./edit-produt.component.css']
})
export class EditProdutComponent implements OnInit{

  constructor(private route:Router,private activeroute:ActivatedRoute){}

  inEditMode=false;
  productId=0;

  editingproduct:{productId:string,productName:string,productPrice:number,ProductDescription:string,
    productRating:number,productQuantityAvl:number,productImg:string,productLaunchTime:Date}={productId:"",productName:"Apple",productPrice:251,ProductDescription:"Apple is fruit that has tainy seeds which contain cinide",
      productRating:4.5,productQuantityAvl:54,productImg:"assets/images/apple.jfif",productLaunchTime:new Date()};

  newProductForm:FormGroup=new FormGroup({});



    ngOnInit(): void {

      this.activeroute.queryParams.subscribe((params)=>{
        this.productId=params['productId'];
        console.log(params['productId'])
        this.inEditMode=params['productId'] != null;
        this.initForm();
      })
    }

    initForm(){
      if(this.inEditMode){
        // console.log(this.editingproduct.productName)
        this.newProductForm=new FormGroup({
          'productName':new FormControl(this.editingproduct.productName,[Validators.required]),
          'avaliableQuantity':new FormControl(this.editingproduct.productQuantityAvl,[Validators.required,Validators.min(1),Validators.max(100)]),
          'productLaunchTime':new FormControl(this.editingproduct.productLaunchTime,[Validators.required]),
          'productPrice':new FormControl(this.editingproduct.productPrice,[Validators.required,Validators.min(1)]),
          'productDescription':new FormControl(this.editingproduct.ProductDescription,[Validators.required]),
          "productImage":new FormControl(null,[Validators.required])
        })
      }else{
        this.newProductForm=new FormGroup({
          'productName':new FormControl(null,[Validators.required]),
          'avaliableQuantity':new FormControl(null,[Validators.required,Validators.min(1),Validators.max(100)]),
          'productLaunchTime':new FormControl(null,[Validators.required]),
          'productPrice':new FormControl(null,[Validators.required,Validators.min(1)]),
          'productDescription':new FormControl(null,[Validators.required]),
          "productImage":new FormControl(null,[Validators.required])
        })

      }
    }


    saveProduct(){
      console.log(this.newProductForm.value)
    }

}
