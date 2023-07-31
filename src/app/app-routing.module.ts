import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopComponent } from './shop-list/shop/shop.component';
import { ProductsComponent } from './shop-list/products/products.component';
import { ProductListComponent } from './shop-list/products/product-list/product-list.component';
import { EditProdutComponent } from './shop-list/products/edit-produt/edit-produt.component';
import { ProfileComponent } from './profile/profile.component';
import { NewShopComponent } from './shop-list/new-shop/new-shop.component';
import { EditReviewComponent } from './shop-list/products/reviews/edit-review/edit-review.component';
import { ReviewComponent } from './shop-list/products/reviews/review/review.component';
import { OrderBillComponent } from './basket/order-bill/order-bill.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { BackEndSwaggerComponent } from './back-end-swagger/back-end-swagger.component';

const routes: Routes = [
  {path:"",redirectTo:"shops",pathMatch:"full"},
  {path:'login',component:AuthComponent},
  {path:'shops',component:ShopListComponent,children:[
    {path:'',component:ShopComponent,pathMatch:"full"},
    {path:'edit-shop',component:NewShopComponent},
    {path:":id",component:ProductsComponent,children:[
      {path:'',component:ProductListComponent,pathMatch:'full'},
      {path:'new-product',component:EditProdutComponent},
      {path:':productId/reviews',component:ReviewComponent},
      {path:':productId/add-review',component:EditReviewComponent}
    ]}
  ]},
  {path:'my-profile',component:ProfileComponent},
  {path:'my-profile/:id',component:ProfileComponent},
  {path:'add-profile',component:ProfileComponent},
  {path:'bill/:id',component:OrderBillComponent},
  {path:'my-orders',component:OrdersComponent},
  {path:'orders',component:OrdersComponent},
  {path:'farmers',component:UsersComponent},
  {path:'dealer',component:UsersComponent},
  {path:'back-end-swagger-docs',component:BackEndSwaggerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
