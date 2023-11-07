import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { Router, RouterModule } from '@angular/router';
import { OrderTotalsComponent } from '../shared/order-totals/order-totals.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule, //Dont import to enable router module to work with breadcrumb
    SharedModule
  ]
})
export class BasketModule { }
