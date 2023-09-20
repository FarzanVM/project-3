import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './templates/homepage/homepage.component';
import { CollectionsComponent } from './templates/homepage/collections/collections.component';
import { FontAwesomeModule,FaIconLibrary } from '@fortawesome/angular-fontawesome';

// import { faCartPlus,faCheckCircle,faCompress,faEye, faGift, faHeart, faHome, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { AllproductsComponent } from './templates/homepage/allproducts/allproducts.component';
import { ProductComponent } from './templates/homepage/product/product.component';
import { CartComponent } from './templates/homepage/cart/cart.component';
import { CheckoutComponent } from './templates/homepage/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CollectionsComponent,
    AllproductsComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library:FaIconLibrary){
    // library.addIconPacks(faGift,faHome,faHeart,faCartPlus,faEye,faCompress,faTrash,faCheckCircle)
    library.addIconPacks(fas,far)
  }
 }
