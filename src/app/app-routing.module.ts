import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopComponent } from './shop-list/shop/shop.component';
import { ProductsComponent } from './shop-list/products/products.component';
import { ProductListComponent } from './shop-list/products/product-list/product-list.component';
import { EditProdutComponent } from './shop-list/products/edit-produt/edit-produt.component';

const routes: Routes = [
  {path:"",redirectTo:"shops",pathMatch:"full"},
  {path:'login',component:AuthComponent},
  {path:'shops',component:ShopListComponent,children:[
    {path:'',component:ShopComponent,pathMatch:"full"},
    {path:":id",component:ProductsComponent,children:[
      {path:'',component:ProductListComponent,pathMatch:'full'},
      {path:'new-product',component:EditProdutComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
