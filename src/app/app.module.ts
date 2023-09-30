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
import { ItemcardComponent } from './templates/homepage/itemcard/itemcard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { FormdirectiveDirective } from './templates/homepage/checkout/formdirective.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { AlertComponent } from './templates/homepage/checkout/alert/alert.component';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CollectionsComponent,
    AllproductsComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    ItemcardComponent,
    FormdirectiveDirective,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatFormFieldModule, 
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule
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
