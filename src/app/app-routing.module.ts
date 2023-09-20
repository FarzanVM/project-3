import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './templates/homepage/homepage.component';
import { CollectionsComponent } from './templates/homepage/collections/collections.component';
import { AllproductsComponent } from './templates/homepage/allproducts/allproducts.component';
import { ProductComponent } from './templates/homepage/product/product.component';
import { CartComponent } from './templates/homepage/cart/cart.component';
import { CheckoutComponent } from './templates/homepage/checkout/checkout.component';

const routes: Routes = [
  {
    path:'',
    component:HomepageComponent,
    children:[
      {
        path:'',
        component:CollectionsComponent
      },
      {
        path:'allproduct',
        component:AllproductsComponent
      },
      {
        path:'product/:id',
        component:ProductComponent
      },
      {
        path:'cart',
        component:CartComponent
      },
      {
        path:'checkout',
        component:CheckoutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
