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
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatIconModule} from '@angular/material/icon';
import { FormdirectiveDirective } from './templates/homepage/checkout/formdirective.directive';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import { AlertComponent } from './templates/homepage/checkout/alert/alert.component';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effect';
import { OutsideClickDirective } from './templates/homepage/outside-click.directive';
import { CategorynavigationComponent } from './templates/homepage/categorynavigation/categorynavigation.component';
import { DateRagePickerHeaderModule } from './templates/homepage/date-rangepicker-header/date-rangepicker-header.module';
import { DateRangepickerComponent } from './templates/homepage/date-rangepicker/date-rangepicker.component';
import { DatePickerComponent } from './templates/homepage/date-picker/date-picker.component';

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
    AlertComponent,
    OutsideClickDirective,
    CategorynavigationComponent,
    DateRangepickerComponent,
    DatePickerComponent
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
    MatTooltipModule,
    HttpClientModule,
    DateRagePickerHeaderModule,
    StoreModule.forRoot({'productsx':productReducer}),
    EffectsModule.forRoot([ProductEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library:FaIconLibrary){
    library.addIconPacks(fas,far)
  }
 }
 // library.addIconPacks(faGift,faHome,faHeart,faCartPlus,faEye,faCompress,faTrash,faCheckCircle)
