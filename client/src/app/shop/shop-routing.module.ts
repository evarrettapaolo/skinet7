import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {path: '',component: ShopComponent, data: {breadcrumb: 'shop'}},
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}}},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes), //Child of parent routing module
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
