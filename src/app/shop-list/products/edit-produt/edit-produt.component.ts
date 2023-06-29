import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { productservice } from '../products.service';

@Component({
  selector: 'app-edit-produt',
  templateUrl: './edit-produt.component.html',
  styleUrls: ['./edit-produt.component.css']
})
export class EditProdutComponent implements OnInit{

  constructor(private route:Router,private activeroute:ActivatedRoute,private authservice:AuthenticationService,private prodservice:productservice){}

  inEditMode=false;
  productId='';
  uplaodedimg:any;
  uploadedimgfile:any;
  error:any;

  editingproduct:{productId:string,productName:string,productPrice:number,ProductDescription:string,
    productRating:number,productQuantityAvl:number,productImg:string,productLaunchTime:Date}=
    {productId:"",productName:"Apple",productPrice:251,ProductDescription:"Apple is fruit that has tainy seeds which contain cinide",
      productRating:4.5,productQuantityAvl:54,productImg:"assets/images/apple.jfif",productLaunchTime:new Date()};

      
      
  newProductForm:FormGroup=new FormGroup({});



    ngOnInit(): void {

      this.activeroute.queryParams.subscribe((params)=>{
        this.productId=params['productId'];
        console.log(params['productId'])
        this.inEditMode=params['productId'] != null;
        this.initForm();
        if(this.inEditMode){
          this.prodservice.getproductById(this.productId).subscribe((responce)=>{

          },error=>{
            this.error=error.error.message;
          })

        }
        this.prodservice.productchanged.subscribe((productdb)=>{
          this.editingproduct.productId=productdb.productId;
          this.editingproduct.productName=productdb.productName;
          this.editingproduct.productPrice=productdb.price
          this.editingproduct.ProductDescription=productdb.productDetails
          this.editingproduct.productRating=4.3;
          this.editingproduct.productQuantityAvl=productdb.availableQuantity
          this.editingproduct.productImg=productdb.productImages[0];
          this.editingproduct.productLaunchTime=productdb.date;

          this.prodservice.getImage(productdb.farmerId+'_'+productdb.productName+'_productImg').subscribe((res)=>{
            this.uploadedimgfile=res;
            this.uplaodedimg = URL.createObjectURL(res);
            this.initForm();
          })
        })
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
      console.log(this.inEditMode)
      if(this.inEditMode){
        let updatedproduct:{
          "productId": string,
          "productName": string,
          "availableQuantity": number,
          "date": Date,
          "price": number,
          "productDetails":string,
          "productImages": string[]
      }={
        "productId": this.productId,
        'productName':this.newProductForm.value['productName'],
          "availableQuantity":this.newProductForm.value['avaliableQuantity'] ,
          "date": this.newProductForm.value['productLaunchTime'],
          "price": this.newProductForm.value['productPrice'],
          "productDetails": this.newProductForm.value['productDescription'],
          "productImages": [this.authservice.getauth().id+'_'+this.newProductForm.value['productName']+'_productImg']

      }

      
      this.prodservice.updateProduct(updatedproduct).subscribe((responce)=>{
        if(responce.status===200){
          const uploadImageData = new FormData();
          uploadImageData.append('image', this.uploadedimgfile,this.authservice.getauth().id+'_'+this.newProductForm.value['productName']+'_productImg');
          this.prodservice.setshopimg(uploadImageData);
          this.route.navigate(['/shops//'+this.authservice.getauth().id])
        }else{
          console.log(responce)
        }
      },error=>{
        this.error=error.error.message;
        console.log(Response)
      });
       
      }
      else{
        let  newproduct: {
          productName:String,
          "availableQuantity": number,
          "date": string,
          "price": number,
          "productDetails": string,
          "status": string,
          "productImages": string[]
      }={
        'productName':this.newProductForm.value['productName'],
          "availableQuantity":this.newProductForm.value['avaliableQuantity'] ,
          "date": this.newProductForm.value['productLaunchTime'],
          "price": this.newProductForm.value['productPrice'],
          "productDetails": this.newProductForm.value['productDescription'],
          "status": 'avaliable',
          "productImages": [this.authservice.getauth().id+'_'+this.newProductForm.value['productName']+'_productImg']
  
      }
     
        this.prodservice.saveNewProduct(newproduct).subscribe((responce)=>{
          if(responce.status===200){
            const uploadImageData = new FormData();
            uploadImageData.append('image', this.uploadedimgfile,this.authservice.getauth().id+'_'+this.newProductForm.value['productName']+'_productImg');
            this.prodservice.setshopimg(uploadImageData);
            this.route.navigate(['/shops/'+this.authservice.getauth().id])
          }else{
            console.log(responce)
          }
        },error=>{
          this.error=error.error.message;
          console.log(this.error)
        });

      }
    
    }

    deleteProduct(){
      if(confirm("are you sure u want to delete this product")){
      this.prodservice.deleteProductById(this.productId).subscribe((res)=>{
        this.route.navigate(['/shops/'+this.authservice.getauth().id])
      });
    }
    }


  uploadedimage(event:any){
  this.uplaodedimg = URL.createObjectURL(event.target.files[0]);
  this.uploadedimgfile=event.target.files[0];
 }



 cancelchanges(){
  if(confirm('are u sure u want to cancel the changes')){
    this.route.navigate(['/shops/'+this.authservice.getauth().id])
  }
 }

}
