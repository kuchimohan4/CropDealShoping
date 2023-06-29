import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopComponent } from './shop-list/shop/shop.component';
import { BasketComponent } from './basket/basket.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductsComponent } from './shop-list/products/products.component';
import { ProductListComponent } from './shop-list/products/product-list/product-list.component';
import { EditProdutComponent } from './shop-list/products/edit-produt/edit-produt.component';
import { BasketFooterComponent } from './basket/basket-footer/basket-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { NewShopComponent } from './shop-list/new-shop/new-shop.component';
import { ReviewsComponent } from './shop-list/products/reviews/reviews.component';
import { ReviewComponent } from './shop-list/products/reviews/review/review.component';
import { EditReviewComponent } from './shop-list/products/reviews/edit-review/edit-review.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { authIntercepter } from './auth/auth.intercepter';
import { OrderBillComponent } from './basket/order-bill/order-bill.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    ShopListComponent,
    ShopComponent,
    BasketComponent,
    ProfileComponent,
    ProductsComponent,
    ProductListComponent,
    EditProdutComponent,
    BasketFooterComponent,
    EditProfileComponent,
    NewShopComponent,
    ReviewsComponent,
    ReviewComponent,
    EditReviewComponent,
    OrderBillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:authIntercepter,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
